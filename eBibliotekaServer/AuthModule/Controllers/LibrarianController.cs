using AutoMapper;
using eBibliotekaServer.AuthModule.Models;
using eBibliotekaServer.AuthModule.Repositories;
using eBibliotekaServer.AuthModule.ViewModels;
using eBibliotekaServer.BookModule.Repositories;
using eBibliotekaServer.BookModule.ViewModels;
using eBibliotekaServer.Helpers;
using eBibliotekaServer.Helpers.Validator;
using eBibliotekaServer.ImageModule.Repositories;
using eBibliotekaServer.LibraryModule.Repositories;
using eBibliotekaServer.MembershipModule.Repositories;
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
    public class LibrarianController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IImageRepository _imageRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly IBookRepository _bookRepository;
        public readonly IMapper _mapper;

        public LibrarianController(IAuthRepository authRepository, IImageRepository imageRepository, ILibraryRepository libraryRepository, IBookRepository bookRepository, IMapper mapper)
        {
            _authRepository = authRepository;
            _imageRepository = imageRepository;
            _libraryRepository = libraryRepository;
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        [HttpGet("username-check/{username}")]
        public ActionResult<bool> CheckUsername(string username)
        {
            var result = _authRepository.CheckUsername(username, AccountType.Library);

            return Ok(result);
        }

        [HttpPost, Route("register")]
        public ActionResult<AccountGetVM> RegisterLibrarian(LibrarianRegisterVM data)
        {
            var errors = Validator.ValidateUserRegistration(data);

            if (!_authRepository.CheckUsername(data.Username, AccountType.Library))
            {
                errors.Add(ValidatorMessages.Username.Taken);
            }

            if (errors.Count > 0)
            {
                return BadRequest(errors);
            }

            var library = _libraryRepository.RegisterLibrary(data.LibraryName);
            var item = _authRepository.RegisterLibrarian(data, library.ID);
            CreateSeriesVM series = new CreateSeriesVM { Name = "Librarian Recommendations", LibraryID = library.ID };
            var recommendations = _bookRepository.CreateSeries(series);
            _libraryRepository.CreateRecommendations(library.ID, recommendations.ID);

            return Ok(_mapper.Map<AccountGetVM>(item));
        }

        [HttpPost, Route("login")]
        public ActionResult<AccountGetVM> Login(LoginVM data)
        {
            try
            {
                var item = _authRepository.LoginLibrarian(data);

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, item.ID.ToString()),
                    new Claim(ClaimTypes.Role, $"Librarian"),
                };

                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:44332",
                    audience: "http://localhost:4200/",
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

        [HttpGet, Route("libraryId")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<int> GetLibraryID()
        {
            string token = Request.Headers["authorization"].First().Remove(0, 7);

            int librarianId = AuthHelper.GetAccountIdFromToken(token);

            return _authRepository.GetLibrarian(librarianId).LibraryID;
        }

        [HttpGet, Route("account")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<AccountDetailsVM> GetAccount()
        {
            var accountId = AuthHelper.GetAccountIdFromRequest(Request);

            var librarian = _authRepository.GetLibrarian(accountId);

            return _mapper.Map<AccountDetailsVM>(librarian);
        }

        [HttpPost, Route("account")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<AccountDetailsVM> UpdateAccount([FromBody] AccountUpdateVM data)
        {
            var errors = Validator.ValidateAccountUpdate(data);

            var accountId = AuthHelper.GetAccountIdFromRequest(Request);

            var librarian = _authRepository.GetLibrarian(accountId);

            if (librarian.Username != data.Username && !_authRepository.CheckUsername(data.Username, AccountType.Library))
            {
                errors.Add(ValidatorMessages.Username.Taken);
            }

            if (errors.Count > 0)
            {
                return BadRequest(errors);
            }

            var item = _authRepository.UpdateLibrarian(accountId, data);

            return _mapper.Map<AccountDetailsVM>(item);
        }

        [HttpPost("profileImage"), DisableRequestSizeLimit]
        [Authorize(Roles = "Librarian")]
        public ActionResult UploadProfileImage()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            if (librarian.ProfileImageID.HasValue)
            {
                if (!_imageRepository.RemoveImage(librarian.ProfileImageID.GetValueOrDefault()))
                {
                    throw new Exception("Greska prilikom brisanja slike");
                }
            }

            try
            {
                var image = _imageRepository.AddImage(Request.Form.Files[0], "AccountProfileImg", librarian.ProfileImageID.ToString());

                librarian.ProfileImageID = image.ID;
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

        [HttpDelete("profileImage")]
        [Authorize(Roles = "Librarian")]
        public ActionResult RemoveProfileImage()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            if (librarian.ProfileImageID.HasValue)
            {
                if (!_imageRepository.RemoveImage(librarian.ProfileImageID.GetValueOrDefault()))
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        [HttpPost, Route("update-password")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<AccountDetailsVM> UpdatePassword([FromBody] PasswordChangeVM data)
        {
            var accountId = AuthHelper.GetAccountIdFromRequest(Request);

            var librarian = _authRepository.GetLibrarian(accountId);

            if (AuthHelper.ConfirmPassword(Encoding.UTF8.GetBytes(data.CurrentPassword), librarian.Password))
            {
                var errors = Validator.ValidateField(FieldType.Password, data.NewPassword);
                if (errors.Count != 0)
                {
                    return BadRequest(errors);
                }

                return _mapper.Map<AccountDetailsVM>(_authRepository.UpdateLibrarianPassword(accountId, data.NewPassword));
            }

            return BadRequest();
        }
    }
}
