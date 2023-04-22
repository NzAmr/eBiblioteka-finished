using eBibliotekaServer.AuthModule.Models;
using eBibliotekaServer.AuthModule.Repositories;
using eBibliotekaServer.BookModule.Repositories;
using eBibliotekaServer.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace eBibliotekaServer.AuthModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IBookRepository _bookRepository;

        public AuthController(IAuthRepository authRepository, IBookRepository bookRepository)
        {
            _authRepository = authRepository;
            _bookRepository = bookRepository;
        }

        [HttpGet, Route("user-type")]
        public ActionResult<AccountType> GetUserType()
        {
            string token = Request.Headers["authorization"].First().Remove(0, 7);

            return AuthHelper.GetAccountType(token);
        }


        [HttpGet, Route("book-auth-check/{bookId}")]
        public ActionResult<bool> IsLibrarianBook(int bookId)
        {
            AccountType type = AuthHelper.GetAccountTypeFromRequest(Request);

            if(type != AccountType.Library)
            {
                return Ok(false);
            }

            var book = _bookRepository.GetBook(bookId);

            var librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            var librarian = _authRepository.GetLibrarian(librarianId);

            return Ok(librarian.LibraryID == book.Author.LibraryID);
        }

        [HttpGet, Route("series-auth-check/{seriesId}")]
        public ActionResult<bool> IsLibrarianSeries(int seriesId)
        {
            AccountType type = AuthHelper.GetAccountTypeFromRequest(Request);

            if (type != AccountType.Library)
            {
                return Ok(false);
            }

            var series = _bookRepository.GetSeries(seriesId);

            var librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            var librarian = _authRepository.GetLibrarian(librarianId);

            return Ok(librarian.LibraryID == series.LibraryID);
        }
    }
}
