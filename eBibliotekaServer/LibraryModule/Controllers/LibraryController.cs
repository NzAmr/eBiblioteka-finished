using AutoMapper;
using System.Linq;
using eBibliotekaServer.Helpers;
using eBibliotekaServer.LibraryModule.Repositories;
using eBibliotekaServer.LibraryModule.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using eBibliotekaServer.LibraryModule.Models;
using eBibliotekaServer.AuthModule.Repositories;
using eBibliotekaServer.ImageModule.Repositories;
using System;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using eBibliotekaServer.Helpers.Validator;
using eBibliotekaServer.MembershipModule.Repositories;
using eBibliotekaServer.LocationModule.Repositories;
using eBibliotekaServer.LocationModule.ViewModels;
using System.Threading.Tasks;
using System.Threading;

namespace eBibliotekaServer.LibraryModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryRepository _libraryRepository;
        private readonly ILocationRepository _locationRepository;
        private readonly IMembershipRepository _membershipRepository;
        private readonly IAuthRepository _authRepository;
        private readonly IImageRepository _imageRepository;
        private readonly IMapper _mapper;

        public LibraryController(ILibraryRepository libraryRepository, ILocationRepository locationRepository, IMembershipRepository membershipRepository, IAuthRepository authRepository, IImageRepository imageRepository, IMapper mapper)
        {
            _libraryRepository = libraryRepository;
            _locationRepository = locationRepository;
            _authRepository = authRepository;
            _imageRepository = imageRepository;
            _membershipRepository = membershipRepository;
            _mapper = mapper;
        }

        [HttpGet("search")]
        public ActionResult<PagedList<LibraryListVM>> SearchLibraries(string filter, int items_per_page, int page_number = 1)
        {
            var items = _libraryRepository.SearchLibraries(filter);
            List<LibraryListVM> results = new List<LibraryListVM>();

            int userId = AuthHelper.GetAccountIdFromRequest(Request);

            if (userId != -1)
            {
                foreach (var item in items)
                {
                    var mapped = _mapper.Map<LibraryListVM>(item);
                    mapped.IsMember = _membershipRepository.IsMember(item.ID, userId);

                    results.Add(mapped);
                }
            } 
            else
            {
                foreach (var item in items)
                {
                    results.Add(_mapper.Map<LibraryListVM>(item));
                }
            }

            return PagedList<LibraryListVM>.Create(results.AsQueryable(), page_number, items_per_page);
        }

        [HttpGet("search-map")]
        public ActionResult<List<LibraryMapSearch>> SearchLibrariesMap()
        {
            var items = _libraryRepository.SearchLibrariesMap();

            var results = new List<LibraryMapSearch>();

            foreach (var item in items)
            {
                results.Add(_mapper.Map<LibraryMapSearch>(item));
            }

            return Ok(results);
        }

        [HttpGet("{id}")]
        public ActionResult<LibraryDetailsVM> GetLibraryDetails(int id)
        {
            var item = _libraryRepository.GetLibrary(id);

            if (item == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<LibraryDetailsVM>(item);

            var offers = _libraryRepository.GetMembershipOffers(id);

            result.MembershipOffers = new List<MembershipOfferGetVM>();

            foreach (var offer in offers)
            {
                result.MembershipOffers.Add(_mapper.Map<MembershipOfferGetVM>(offer));
            }

            var hours = _libraryRepository.GetBusinessHours(id);

            result.BusinessHours = new List<BusinessHoursGetVM>();

            foreach (var hour in hours)
            {
                result.BusinessHours.Add(_mapper.Map<BusinessHoursGetVM>(hour));
            }

            int userId = AuthHelper.GetAccountIdFromRequest(Request);

            if(userId != -1)
            {
                result.membership = _membershipRepository.GetMember(id, userId);
                if(result.membership != null)
                {
                    result.membership.MembershipOffer.Library = null;
                }
            }

            return Ok(result);
        }

        [HttpGet("details/map/{id}")]
        public ActionResult<LibraryListVM> GetLibraryDetailsForMap(int id)
        {
            Thread.Sleep(1000);

            int userId = AuthHelper.GetAccountIdFromRequest(Request);

            var item = _libraryRepository.GetLibrary(id);

            if (item == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<LibraryListVM>(item);
            result.Location = null;

            if (userId != -1)
            {
                result.IsMember = _membershipRepository.IsMember(item.ID, userId);
            }

            return Ok(result);
        }

        [HttpGet]
        [Authorize(Roles = "Librarian")]
        public ActionResult<LibraryDetailsVM> GetLibraryAuth()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var item = _libraryRepository.GetLibrary(libraryID);

            if (item == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<LibraryDetailsVM>(item);

            var offers = _libraryRepository.GetMembershipOffers(libraryID);

            result.MembershipOffers = new List<MembershipOfferGetVM>();

            foreach (var offer in offers)
            {
                result.MembershipOffers.Add(_mapper.Map<MembershipOfferGetVM>(offer));
            }

            var hours = _libraryRepository.GetBusinessHours(libraryID);

            result.BusinessHours = new List<BusinessHoursGetVM>();

            foreach (var hour in hours)
            {
                result.BusinessHours.Add(_mapper.Map<BusinessHoursGetVM>(hour));
            }

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Library> UpdateLibrary([FromBody] LibraryUpdateVM data)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var item = _libraryRepository.UpdateLibrary(libraryID, data);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost("profileImage"), DisableRequestSizeLimit]
        [Authorize(Roles = "Librarian")]
        public ActionResult UploadProfileImgImage()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            if (librarian.Library.ProfileImageID.HasValue)
            {
                if (!_imageRepository.RemoveImage(librarian.Library.ProfileImageID.GetValueOrDefault()))
                {
                    throw new Exception("Greska prilikom brisanja slike");
                }
            }

            try
            {
                var image = _imageRepository.AddImage(Request.Form.Files[0], librarian.LibraryID.ToString(), "ProfileImg");

                librarian.Library.ProfileImageID = image.ID;
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

        [HttpPost("banner"), DisableRequestSizeLimit]
        [Authorize(Roles = "Librarian")]
        public ActionResult UploadNewBannerImage()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            if (librarian.Library.BannerImageID.HasValue)
            {
                if (!_imageRepository.RemoveImage(librarian.Library.BannerImageID.GetValueOrDefault()))
                {
                    throw new Exception("Greska prilikom brisanja slike");
                }

            }

            try
            {
                var image = _imageRepository.AddImage(Request.Form.Files[0], librarian.LibraryID.ToString(), "Banner");

                librarian.Library.BannerImageID = image.ID;
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

            if (librarian.Library.ProfileImageID.HasValue)
            {
                if (!_imageRepository.RemoveImage(librarian.Library.ProfileImageID.GetValueOrDefault()))
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        [HttpDelete("banner")]
        [Authorize(Roles = "Librarian")]
        public ActionResult RemoveBanner()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            if (librarian.Library.BannerImageID.HasValue)
            {
                if (!_imageRepository.RemoveImage(librarian.Library.BannerImageID.GetValueOrDefault()))
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        [HttpPost("offers")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Library> CreateOffer([FromBody] MembershipOfferCreateVM data)
        {
            var errors = Validator.ValidateMembershipOffer(_mapper.Map<MembershipOffer>(data));

            if (errors.Count > 0)
            {
                return BadRequest(errors);
            }

            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var item = _libraryRepository.CreateMembershipOffer(libraryID, data);

            return Ok(item);
        }

        [HttpGet("offers")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<MembershipOfferGetVM> GetOffersForLibrary()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var item = _libraryRepository.GetMembershipOffers(libraryID);

            return Ok(item);
        }

        [HttpDelete("offers/{id}")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Library> CreateOffer(int id)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var item = _libraryRepository.GetMembershipOffer(id);

            if (item.LibraryID != libraryID) return Unauthorized();

            item = _libraryRepository.DeleteMembershipOffer(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost("offers/{id}")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Library> UpdateOffer(int id, [FromBody] MembershipOfferUpdateVM data)
        {
            var errors = Validator.ValidateMembershipOffer(_mapper.Map<MembershipOffer>(data));

            if (errors.Count > 0)
            {
                return BadRequest(errors);
            }

            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var item = _libraryRepository.GetMembershipOffer(id);

            if (item.LibraryID != libraryID) return Unauthorized();

            item = _libraryRepository.UpdateMembershipOffer(id, data);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost("business-hours/{id}")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<BusinessHours> PostBusinessHours(int id, [FromBody]BusinessHoursCreateVM data)
        {
            var errors = Validator.ValidateBusinessHours(data);

            if (errors.Count > 0)
            {
                return BadRequest(errors);
            }

            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            if (id == -1)
            {
                var item = _libraryRepository.CreateBusinessHours(libraryID, data);

                return Ok(item);
            } else
            {
                var item = _libraryRepository.GetBusinessHour(id);

                if (item.LibraryID != libraryID) return Unauthorized();

                item = _libraryRepository.UpdateBusinessHours(id, data);

                if(item == null)
                {
                    return BadRequest();
                }

                if (item.LibraryID != libraryID) return Unauthorized();

                return Ok(item);
            }

        }

        [HttpDelete("business-hours/{id}")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<BusinessHours> DeleteBusinessHours(int id)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var item = _libraryRepository.GetBusinessHour(id);

            if (item.LibraryID != libraryID) return Unauthorized();

            item = _libraryRepository.DeleteBusinessHours(id);

            if (item.LibraryID != libraryID) return Unauthorized();

            return Ok(item);
        }

        [HttpGet("for-user")]
        [Authorize(Roles = "User")]
        public ActionResult<LibraryDetailsVM> GetLibrariesForUser()
        {
            int userId = AuthHelper.GetAccountIdFromRequest(Request);

            var items = _libraryRepository.GetLibrariesForUser(userId);

            var results = new List<UserLibrariesVM>();

            foreach(var item in items)
            {
                results.Add(_mapper.Map<UserLibrariesVM>(item));
            }

            return Ok(results);
        }
        [HttpPost("send-notification")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Notification> SendNotification([FromBody] SendNotificationVM data) 
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var result = _libraryRepository.SendNotification(data, libraryID);
            return Ok(result);
        }
        [HttpGet("get-notifications-for-user")]
        [Authorize(Roles = "User")]
        public ActionResult<List<NotificationListItemVM>> GetNotificationsForUser()
        {
            int userId = AuthHelper.GetAccountIdFromRequest(Request);
            List<NotificationListItemVM> results = new List<NotificationListItemVM>();
            var items = _libraryRepository.GetNotificationsForUser(userId);
            foreach (var item in items)
            {
                results.Add(_mapper.Map<NotificationListItemVM>(item));
            }
            if(results.Count == 0)
            {
                return NotFound();
            }
            return Ok(results);
        }
        [HttpGet("get-notification")]
        [Authorize(Roles = "User")]
        public ActionResult<Notification> GetNotification(int id)
        {
           var item = _libraryRepository.GetNotification(id);
            if (item == null)
            {
                return NotFound();

            }
            else if(item.RecipientID != id)
            {
                return Unauthorized();
            }
            return Ok(item);
        }
        [HttpDelete("remove-notification")]
        [Authorize(Roles = "User")]
        public ActionResult<bool> RemoveNotification(int id)
        {
            int userId = AuthHelper.GetAccountIdFromRequest(Request);
            var item = _libraryRepository.GetNotification(id);
            if (item.RecipientID != userId)
            {
                return Unauthorized();
            }
            else
            {
                _libraryRepository.RemoveNotification(id);
                return Ok(true);
            }
        }
    }
}
