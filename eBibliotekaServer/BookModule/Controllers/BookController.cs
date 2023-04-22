using AutoMapper;
using eBibliotekaServer.AuthModule.Repositories;
using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.BookModule.Repositories;
using eBibliotekaServer.BookModule.Repositories.Implementation;
using eBibliotekaServer.BookModule.ViewModels;
using eBibliotekaServer.Helpers;
using eBibliotekaServer.ImageModule.Repositories;
using eBibliotekaServer.LibraryModule.Repositories;
using eBibliotekaServer.MembershipModule.Models;
using eBibliotekaServer.MembershipModule.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;

namespace eBibliotekaServer.BookModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IMapper _mapper;
        private readonly IBookRepository _bookRepository;
        private readonly IAuthorRepository _authorRepository;
        private readonly IMembershipRepository _membershipRepository;
        private readonly IImageRepository _imageRepository;
        private readonly ILibraryRepository _libraryRepository;

        public BookController(IAuthRepository authRepository, IMapper mapper,
            IBookRepository bookRepository, IAuthorRepository authorRepository,
            IMembershipRepository membershipRepository, IImageRepository imageRepository , ILibraryRepository libraryRepository)
        {
            _authRepository = authRepository;
            _mapper = mapper;
            _bookRepository = bookRepository;
            _authorRepository = authorRepository;
            _membershipRepository = membershipRepository;
            _imageRepository = imageRepository;
            _libraryRepository = libraryRepository;
        }

        [HttpGet("{id}")]
        public ActionResult<BookDetailsVM> GetBookDetails(int id)
        {
            var book = _bookRepository.GetBook(id);

            if (book == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<BookDetailsVM>(book);

            result.CopiesRemaining = book.NumberOfCopies - _bookRepository.GetLentBooksByBook(id).Count;

            return Ok(result);
        }

        [HttpGet("for-user")]
        [Authorize(Roles = "User")]
        public ActionResult<UserLentBookVM> GetLentBooksForUser(int id)
        {
            int userID = AuthHelper.GetAccountIdFromRequest(Request);

            var items = _bookRepository.GetLentBooksForUser(userID);

            var results = new List<UserLentBookVM>();

            foreach (var item in items)
            {
                results.Add(_mapper.Map<UserLentBookVM>(item));
            }

            return Ok(results);
        }

        [HttpPost]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Book> AddBook(BookAddVM data)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var author = _authorRepository.GetAuthor(data.AuthorID);
            if (string.IsNullOrEmpty(data.Title) || data.NumberOfCopies < 1)
            {
                return BadRequest();
            }
            if (author.LibraryID == libraryID)
            {

                return Ok(_bookRepository.AddBook(data));
            }
            else
            {
                return Unauthorized();
            }
        }
        [HttpGet("search")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<PagedList<BookSearchVM>> SearchBooks(string filter, int items_per_page, int page_number = 1)

        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var items = _bookRepository.SearchBooks(filter).Where(b => b.Author.LibraryID == libraryID).ToList();
            List<BookSearchVM> results = new List<BookSearchVM>();
            foreach (var item in items)
            {
                results.Add(_mapper.Map<BookSearchVM>(item));
            }
            return PagedList<BookSearchVM>.Create(results.AsQueryable(), page_number, items_per_page);
        }
        [HttpGet("search-librarian-list")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<List<BookSearchVM>> SearchBooksList(string filter)

        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            var items = _bookRepository.SearchBooks(filter).Where(b => b.Author.LibraryID == libraryID).ToList();
            List<BookSearchVM> results = new List<BookSearchVM>();
            foreach (var item in items)
            {
                results.Add(_mapper.Map<BookSearchVM>(item));
            }
            return results;
        }
        [HttpGet("userSearch")]
        public ActionResult<PagedList<BookSearchVM>> UserSearchBooks(string filter, int libraryID, int items_per_page, int page_number = 1)

        {
            var items = _bookRepository.SearchBooks(filter).Where(b => b.Author.LibraryID == libraryID).ToList();
            List<BookSearchVM> results = new List<BookSearchVM>();
            foreach (var item in items)
            {
                results.Add(_mapper.Map<BookSearchVM>(item));
            }
            return PagedList<BookSearchVM>.Create(results.AsQueryable(), page_number, items_per_page);
        }

        [HttpPost("update")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Book> UpdateBook([FromBody] BookUpdateVM data)
        {


            return (_bookRepository.UpdateBook(data));
        }

        [HttpGet("can-lend/{bookId}")]
        public ActionResult<CanLendVM> CanLend(int bookId)
        {
            int userID = AuthHelper.GetAccountIdFromRequest(Request);

            if (userID == -1)
            {
                return Ok(new CanLendVM()
                {
                    CanLend = false,
                    IsMember = false,
                    Message = "Morate biti član biblioteke da biste mogli posuđivati knjige."
                });
            }

            Book book = _bookRepository.GetBook(bookId);

            Membership membership = _membershipRepository.GetMember(book.Author.LibraryID, userID);

            if (membership != null)
            {
                if (membership.MembershipOffer.NoOfBooks <= _bookRepository.GetLentBooksForMembership(membership.ID).Count)
                {
                    return Ok(new CanLendVM()
                    {
                        CanLend = false,
                        IsMember = true,
                        Message = "Dostignut je maksimalan broj iznajmljenih knjiga za člana."
                    });
                }

                if (membership.MembershipOffer.NoOfBooks <= _bookRepository.GetLentBooksByBook(bookId).Count)
                {
                    return Ok(new CanLendVM()
                    {
                        CanLend = false,
                        IsMember = true,
                        Message = "Sve kopije su zauzete."
                    });
                }

                return Ok(new CanLendVM()
                {
                    CanLend = true,
                    IsMember = true,
                });
            }
            else
            {
                return Ok(new CanLendVM()
                {
                    CanLend = false,
                    IsMember = false,
                    Message = "Morate biti član biblioteke da biste mogli posuđivati knjige."
                });
            }
        }

        [HttpPost("lend/{bookId}")]
        [Authorize(Roles = "User")]
        public ActionResult<Book> LendBook(int bookId, [FromBody] LendBookAddVM data)
        {
            int userID = AuthHelper.GetAccountIdFromRequest(Request);

            Book book = _bookRepository.GetBook(bookId);

            Membership membership = _membershipRepository.GetMember(book.Author.LibraryID, userID);

            if (membership != null)
            {
                if (membership.MembershipOffer.NoOfBooks <= _bookRepository.GetLentBooksForMembership(membership.ID).Count)
                {
                    return BadRequest(new { Message = "Dostignut je maksimalan broj iznajmljenih knjiga za člana!" });
                }



                return Ok(_bookRepository.LendBook(bookId, membership.ID, data));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("lent-books-user/{bookId}")]
        [Authorize(Roles = "User")]
        public ActionResult<List<LentBookListVM>> GetLentBooksForUserByBook(int bookId)
        {
            int userID = AuthHelper.GetAccountIdFromRequest(Request);

            Book book = _bookRepository.GetBook(bookId);

            Membership membership = _membershipRepository.GetMember(book.Author.LibraryID, userID);

            if (membership != null)
            {
                var items = _bookRepository.GetLentBooksForUserByBook(bookId, userID);

                var result = new List<LentBookListVM>();

                foreach (var item in items)
                {
                    result.Add(_mapper.Map<LentBookListVM>(item));
                }

                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("cover-image/{bookId}"), DisableRequestSizeLimit]
        [Authorize(Roles = "Librarian")]
        public ActionResult UploadCoverImage(int bookId)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            var book = _bookRepository.GetBook(bookId);

            if (librarian.LibraryID != book.Author.LibraryID)
            {
                return Forbid();
            }

            if (book.CoverImageID.HasValue)
            {
                if (!_imageRepository.RemoveImage(book.CoverImageID.GetValueOrDefault()))
                {
                    throw new Exception("Greska prilikom brisanja slike");
                }
            }

            try
            {
                var image = _imageRepository.AddImage(Request.Form.Files[0], librarian.LibraryID.ToString(), "bookCovers");

                book.CoverImageID = image.ID;
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

        [HttpDelete("cover-image/{bookId}")]
        [Authorize(Roles = "Librarian")]
        public ActionResult RemoveCoverImage(int bookId)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            var book = _bookRepository.GetBook(bookId);

            if (librarian.LibraryID != book.Author.LibraryID)
            {
                return Forbid();
            }

            if (book.CoverImageID.HasValue)
            {
                if (!_imageRepository.RemoveImage(book.CoverImageID.GetValueOrDefault()))
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        [HttpPost("add-tag")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<BookTag> AddTag(TagAddVM data)

        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;

            if (data.Content.Length < 2 || data.Title.Length < 2)
            {
                return BadRequest();
            }
            return Ok(_bookRepository.AddBookTag(data));
        }
        [HttpGet("get-tag")]
        public ActionResult<BookTag> GetTag(int id)
        {
            var item = _bookRepository.GetBookTag(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }
        [HttpGet("get-tags-by-book")]
        public ActionResult<List<TagGetVM>> GetTagsByBook(int id)
        {
            var items = _bookRepository.GetTagsByBook(id);
            List<TagGetVM> results = new List<TagGetVM>();
            if (items.Count == 0)
            {
                return NotFound();
            }
            foreach (var item in items)
            {
                results.Add(_mapper.Map<TagGetVM>(item));
            }
            return Ok(results);
            /* var items = _bookRepository.SearchBooks(filter).Where(b=>b.Author.LibraryID==libraryID).ToList();
            List<BookSearchVM> results = new List<BookSearchVM>();
            foreach (var item in items)
            {
                results.Add(_mapper.Map<BookSearchVM>(item));
            }
            return PagedList<BookSearchVM>.Create(results.AsQueryable(), page_number, items_per_page);*/
        }
        [HttpDelete("removeTag/{id}")]
        [Authorize(Roles = "Librarian")]
        public ActionResult RemoveTag(int id)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);
            if (_bookRepository.RemoveTag(id))
            {
                return Ok();
            }
            return NotFound();
        }

        [HttpPost("create-series")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<Series> CreateSeries(string name)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;
            CreateSeriesVM seriesVM = new CreateSeriesVM
            {
                Name = name,
                LibraryID = libraryID
            };
            Series series = _bookRepository.CreateSeries(seriesVM);
            return Ok(series);
        }

        [HttpPost("add-book-to-series")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<BookSeries> AddBookToSeries(int BookID, int SeriesID)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;
            if (_bookRepository.GetBook(BookID).Author.LibraryID != libraryID ||
                _bookRepository.GetSeries(SeriesID).LibraryID != libraryID)
            {
                return Unauthorized();
            }
            var item = _bookRepository.AddBookToSeries(BookID,SeriesID);
            return Ok(item);

        }
        [HttpGet("get-series-librarian")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<List<SeriesListItemVM>> getSeriesLibrarian(string filter)
        {
            int librarianid = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryid = _authRepository.GetLibrarian(librarianid).LibraryID;

            var results = _bookRepository.GetSeriesPerLibraryId(libraryid, filter);
            var list = new List<SeriesListItemVM>();
            if (results == null)
            {
                return NotFound();
            }
            else
            {
                foreach (var item in results)
                {
                    list.Add(_mapper.Map<SeriesListItemVM>(item));
                }
                return Ok(list);
            }

        }
        [HttpGet("get-books-by-series")]
        public ActionResult<List<BookSearchVM>> getBooksBySeries(int id)
        {
            List<BookSearchVM> res = new List<BookSearchVM>();
            var items = _bookRepository.GetBooksBySeries(id);
            if(items == null)
            {
                return NotFound();
            }
            foreach (var item in items)
            {
                res.Add(_mapper.Map<BookSearchVM>(item));

            }
            return res;
        }
        /*[HttpGet("get-books-by-series")]
        public ActionResult<PagedList<BookSearchVM>> getBooksBySeries(int id, int items_per_page, int page_number = 1)
        {
            List<BookSearchVM> res = new List<BookSearchVM>();
            var items = _bookRepository.GetBooksBySeries(id);
            if (items == null)
            {
                return NotFound();
            }
            foreach (var item in items)
            {
                res.Add(_mapper.Map<BookSearchVM>(item));

            }
            return PagedList<BookSearchVM>.Create(res.AsQueryable(), page_number, items_per_page);
        }*/
        [HttpPost("add-book-to-recommendations")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<BookSeries> AddBookToRecommendations(int BookID)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;
            var library = _libraryRepository.GetLibrary(libraryID);
            var SeriesID = library.LibrarianRecommendations.ID;
            if (_bookRepository.GetBook(BookID).Author.LibraryID != libraryID ||
                _bookRepository.GetSeries(SeriesID).LibraryID != libraryID)
            {
                return Unauthorized();
            }
            var item = _bookRepository.AddBookToSeries(BookID, SeriesID);
            return Ok(item);

        }

        [HttpGet("get-recommendations-by-library")]
        public ActionResult<List<BookSearchVM>> GetRecommendationsUser(int id)
        {
            List<BookSearchVM> res = new List<BookSearchVM>();
            var items = _bookRepository.GetBooksBySeries(id);
            if (items == null)
            {
                return NotFound();
            }
            foreach (var item in items)
            {
                res.Add(_mapper.Map<BookSearchVM>(item));

            }
            return res; 
        }

        [HttpGet("get-recommendations-for-librarian")]
        public ActionResult<List<BookSearchVM>> GetRecommendationsLibrarian()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;
            List<BookSearchVM> res = new List<BookSearchVM>();
            var items = _bookRepository.GetBooksBySeries(libraryID);
            if (items == null)
            {
                return NotFound();
            }
            foreach (var item in items)
            {
                res.Add(_mapper.Map<BookSearchVM>(item));

            }
            return res;
        }
        [HttpGet("get-recommendations-id")]
        public ActionResult<int> GetRecommendationsID()
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryID = _authRepository.GetLibrarian(librarianId).LibraryID;
            return Ok(_bookRepository.GetLibraryRecommendationID(libraryID));
        }
        [HttpGet("get-series-by-book")]
        public ActionResult<List<SeriesListItemVM>> getSeriesByBook(int id)
        {
            List<SeriesListItemVM> res = new List<SeriesListItemVM>();
            var items = _bookRepository.GetSeriesByBook(id);
            if (items == null)
            {
                return NotFound();
            }
            foreach (var item in items)
            {
                res.Add(_mapper.Map<SeriesListItemVM>(item));

            }
            return Ok(res);
        }
      [HttpDelete("remove-book-from-series")]
      [Authorize(Roles = "Librarian")]
       public ActionResult<bool> RemoveBookFromSeries(int BookID, int SeriesID)
        {
            int librarianid = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryid = _authRepository.GetLibrarian(librarianid).LibraryID;

            if(_bookRepository.GetBook(BookID).Author.LibraryID == libraryid && 
                _bookRepository.GetSeries(SeriesID).LibraryID == libraryid)
            {
            return _bookRepository.RemoveBookFromSeries(BookID,SeriesID);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpDelete("remove-book-from-recommendations")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<bool> RemoveBookFromRecommendations(int BookID)
        {
            int librarianid = AuthHelper.GetAccountIdFromRequest(Request);

            int libraryid = _authRepository.GetLibrarian(librarianid).LibraryID;

            var library = _libraryRepository.GetLibrary(libraryid);
            int SeriesID = library.LibrarianRecommendations.ID;
            if (_bookRepository.GetBook(BookID).Author.LibraryID == libraryid &&
                _bookRepository.GetSeries(SeriesID).LibraryID == libraryid)
            {
                return _bookRepository.RemoveBookFromSeries(BookID, SeriesID);
            }
            else
            {
                return Unauthorized();
            }
        }
        [HttpGet("lent-books/{id}")]
        public ActionResult<List<LentBookAvailabilityVM>> getLentBooksByBook(int id)
        {
            List<LentBookAvailabilityVM> res = new List<LentBookAvailabilityVM>();
            var items = _bookRepository.GetLentBooksByBook(id);
            if (items == null)
            {
                return NotFound();
            }
            foreach (var item in items)
            {
                if(item.ReturnTime == default(DateTime))
                {
                    res.Add(_mapper.Map<LentBookAvailabilityVM>(item));
                }
            }
            return res;
        }

        [HttpPost("register-lending")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<LentBookListVM> RegisterLending(int bookId, int memberId, [FromBody] LendBookAddVM data)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            Book book = _bookRepository.GetBook(bookId);

            if(book == null || librarian.LibraryID != book.Author.LibraryID)
            {
                return BadRequest();
            }

            Membership membership = _membershipRepository.GetMembership(memberId);

            if (membership != null)
            {
                if (membership.MembershipOffer.NoOfBooks <= _bookRepository.GetLentBooksForMembership(membership.ID).Count)
                {
                    return BadRequest(new { Message = "Dostignut je maksimalan broj iznajmljenih knjiga za člana!" });
                }

                return Ok(_mapper.Map<LentBookListVM>(_bookRepository.LendBook(bookId, membership.ID, data)));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("register-lending-summary")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<RegisterLendingSummaryVM> RegisterLendingSummary(int bookId, int memberId)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            Thread.Sleep(1000);

            Book book = _bookRepository.GetBook(bookId);

            if (librarian.LibraryID != book.Author.LibraryID)
            {
                return BadRequest();
            }

            Membership membership = _membershipRepository.GetMembership(memberId);

            if (membership != null)
            {
                return Ok(
                       new RegisterLendingSummaryVM()
                       {
                           Member = _mapper.Map<MemberListVM>(membership),
                           Book = _mapper.Map<BookSearchVM>(book),
                           NumberOfCopies = book.NumberOfCopies,
                           CopiesRemaining = book.NumberOfCopies - _bookRepository.GetLentBooksByBook(bookId).Count
            }
                    );
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("register-return/{id}")]
        [Authorize(Roles = "Librarian")]
        public ActionResult<LentBookListVM> RegisterReturn(int id)
        {
            int librarianId = AuthHelper.GetAccountIdFromRequest(Request);
            var librarian = _authRepository.GetLibrarian(librarianId);

            var lentBook = _bookRepository.GetLentBook(id);

            if (librarian.LibraryID != lentBook.Book.Author.LibraryID)
            {
                return BadRequest();
            }

            return _mapper.Map< LentBookListVM >( _bookRepository.RegisterReturn(id));
        }
    }
}
