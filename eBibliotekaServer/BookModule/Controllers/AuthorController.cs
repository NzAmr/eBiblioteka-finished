using AutoMapper;
using eBibliotekaServer.AuthModule.Repositories;
using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.BookModule.Repositories;
using eBibliotekaServer.BookModule.ViewModels;
using eBibliotekaServer.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace eBibliotekaServer.BookModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;

        public AuthorController(IAuthorRepository authorRepository, IAuthRepository authRepository, IMapper mapper)
        {
            _authRepository = authRepository;
            _authorRepository = authorRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public ActionResult<Author> GetAuthor(int id)
        {
            var item = _authorRepository.GetAuthor(id);
            if (item == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(item);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Author> AddAuthor(string name)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            if (name == null || name.Length < 3)
            {
                return BadRequest();
            }
            else
            {
                var item = _authorRepository.AddAuthor(name, libraryID);
                return Ok(item);
            }
        }

        [HttpPost("update")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Author> UpdateAuthor([FromBody] AuthorListVM data)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var item = _authorRepository.UpdateAuthor(libraryID, data);
            if (data.Name.Length<3)
            {
                return BadRequest();
            }
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet("search")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<List<AuthorListVM>> SearchAuthors(string? filter)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var items = _authorRepository.SearchAuthors(libraryID, filter);
            List<AuthorListVM> results = new List<AuthorListVM>();

            foreach (var item in items)
            {
                results.Add(_mapper.Map<AuthorListVM>(item));
            }
            return results;
        }

        [HttpDelete("remove/{id}")]
        [Authorize(Roles = "Librarian")]
        public ActionResult RemoveAuthor(int id)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            if (_authorRepository.RemoveAuthor(id))
            {
                return Ok();
            }
            return NotFound();
        }

        
       
    }
}
