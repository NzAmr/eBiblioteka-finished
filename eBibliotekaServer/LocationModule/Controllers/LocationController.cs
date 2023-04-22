using AutoMapper;
using eBibliotekaServer.AuthModule.Repositories;
using eBibliotekaServer.Helpers;
using eBibliotekaServer.LibraryModule.Repositories;
using eBibliotekaServer.LocationModule.Models;
using eBibliotekaServer.LocationModule.Repositories;
using eBibliotekaServer.LocationModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eBibliotekaServer.LocationModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly IAuthRepository _authRepository;
        private readonly IMapper _mapper;

        public LocationController(ILocationRepository locationRepository, ILibraryRepository libraryRepository, IAuthRepository authRepository, IMapper mapper)
        {
            _locationRepository = locationRepository;
            _libraryRepository = libraryRepository;
            _authRepository = authRepository;
            _mapper = mapper;
        }

        [HttpPost("library/")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Location> AddLocationToLibrary([FromBody] LocationVM data)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            var library = _authRepository.GetLibrarian(librarianId);

            var item = _locationRepository.AddLocationToLibrary(library.LibraryID, data);

            return Ok(item);
        }

        [HttpGet("library")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Location> GetLocationForLibrary()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            var library = _authRepository.GetLibrarian(librarianId);

            var item = _locationRepository.GetLocationForLibrary(library.LibraryID);

            return Ok(item);
        }

        [HttpDelete("library")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Location> RemoveLocationForLibrary()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            var library = _authRepository.GetLibrarian(librarianId);

            var item = _locationRepository.RemoveLocationForLibrary(library.LibraryID);

            return Ok(item);
        }
    }
}
