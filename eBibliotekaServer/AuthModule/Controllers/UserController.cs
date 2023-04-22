using AutoMapper;
using eBibliotekaServer.AuthModule.Models;
using eBibliotekaServer.AuthModule.Repositories;
using eBibliotekaServer.AuthModule.ViewModels;
using eBibliotekaServer.Helpers;
using eBibliotekaServer.Helpers.Validator;
using eBibliotekaServer.ImageModule.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace eBibliotekaServer.AuthModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IImageRepository _imageRepository;
        public readonly IMapper _mapper;

        public UserController(IAuthRepository repository, IImageRepository imageRepository, IMapper mapper)
        {
            _authRepository = repository;
            _imageRepository = imageRepository;
            _mapper = mapper;
        }

        [HttpGet("username-check/{username}")]
        public ActionResult<bool> CheckUsername(string username)
        {
            var result = _authRepository.CheckUsername(username, AccountType.User);

            return Ok(result);

        }

        [HttpPost, Route("register")]
        public ActionResult<AccountGetVM> RegisterUser(UserRegisterVM data)
        {
            var errors = Validator.ValidateUserRegistration(data);
                
            if(!_authRepository.CheckUsername(data.Username, AccountType.User))
            {
                errors.Add(ValidatorMessages.Username.Taken);
            }

            if(errors.Count > 0)
            {
                return BadRequest(errors);
            }

            var item = _authRepository.RegisterUser(data);

            return Ok(_mapper.Map<AccountGetVM>(item));
        }

        [HttpPost, Route("login")]
        public ActionResult<User> LoginUser(LoginVM data)
        {
            try
            {
                var item = _authRepository.LoginUser(data);

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, item.ID.ToString()),
                    new Claim(ClaimTypes.Role, $"User"),
                };

                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:44332",
                    audience: "http://localhost:4200",
                    claims: claims,
                    expires: DateTime.Now.AddDays(7),
                    signingCredentials: signingCredentials
                    );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new { Token = tokenString });
            }
            catch (Exception ex)
            {
                return Unauthorized(new
                {
                    Message = "Pogrešno korisničko ime ili lozinka"
                });
            }
        }

        [HttpGet, Route("account")]
        [Authorize(Roles = "User")]
        public ActionResult<AccountDetailsVM> GetAccount()
        {
            var accountId = AuthHelper.GetAccountIdFromRequest(Request);

            var user = _authRepository.GetUser(accountId);

            return _mapper.Map<AccountDetailsVM>(user);
        }

        [HttpPost, Route("account")]
        [Authorize(Roles = "User")]
        public ActionResult<AccountDetailsVM> UpdateAccount([FromBody] AccountUpdateVM data)
        {
            var errors = Validator.ValidateAccountUpdate(data);

            var accountId = AuthHelper.GetAccountIdFromRequest(Request);

            var user = _authRepository.GetUser(accountId);

            if (user.Username != data.Username && !_authRepository.CheckUsername(data.Username, AccountType.User))
            {
                errors.Add(ValidatorMessages.Username.Taken);
            }

            if (errors.Count > 0)
            {
                return BadRequest(errors);
            }

            var item = _authRepository.UpdateUser(accountId, data);

            return _mapper.Map<AccountDetailsVM>(item);
        }

        [HttpPost("profileImage"), DisableRequestSizeLimit]
        [Authorize(Roles = "User")]
        public ActionResult UploadProfileImage()
        {
            int userId = AuthHelper.GetAccountIdFromRequest(Request);
            var user = _authRepository.GetUser(userId);

            if (user.ProfileImageID.HasValue)
            {
                if (!_imageRepository.RemoveImage(user.ProfileImageID.GetValueOrDefault()))
                {
                    throw new Exception("Greska prilikom brisanja slike");
                }
            }

            try
            {
                var image = _imageRepository.AddImage(Request.Form.Files[0], "AccountProfileImg", user.ProfileImageID.ToString());

                user.ProfileImageID = image.ID;
                _imageRepository.SaveChanges();

                return Ok(image);
            }
            catch (InvalidDataException ex)
            {
                return BadRequest("Invalid file");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("profileImage"), DisableRequestSizeLimit]
        [Authorize(Roles = "User")]
        public ActionResult RemoveProfileImage()
        {
            int userId = AuthHelper.GetAccountIdFromRequest(Request);
            var user = _authRepository.GetUser(userId);

            if (user.ProfileImageID.HasValue)
            {
                if (!_imageRepository.RemoveImage(user.ProfileImageID.GetValueOrDefault()))
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        [HttpPost, Route("update-password")]
        [Authorize(Roles = "User")]
        public ActionResult<AccountDetailsVM> UpdatePassword([FromBody] PasswordChangeVM data)
        {
            var accountId = AuthHelper.GetAccountIdFromRequest(Request);

            var user = _authRepository.GetUser(accountId);

            if (AuthHelper.ConfirmPassword(Encoding.UTF8.GetBytes(data.CurrentPassword), user.Password))
            {
                var errors = Validator.ValidateField(FieldType.Password, data.NewPassword);
                if (errors.Count != 0)
                {
                    return BadRequest(errors);
                }

                return _mapper.Map<AccountDetailsVM>(_authRepository.UpdateUserPassword(accountId, data.NewPassword));
            }

            return BadRequest();
        }
    }
    }
