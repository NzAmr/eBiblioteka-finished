using AutoMapper;
using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.BookModule.ViewModels;
using eBibliotekaServer.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eBibliotekaServer.BookModule.Repositories.Implementation
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext _context;

        public BookRepository(AppDbContext context)
        {
            _context = context;
        }

        public Book AddBook(BookAddVM data)
        {
            var book = new Book
            {
                Title = data.Title,
                Description = data.Description,
                NumberOfCopies = data.NumberOfCopies,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                AuthorID = data.AuthorID,
            };
            _context.Books.Add(book);
            _context.SaveChanges();
            return book;
        }

        public Book GetBook(int id)
        {
            var book = _context.Books.Include(b => b.Author).Include(b => b.CoverImage).FirstOrDefault(book => book.ID == id);
            return book;
        }

        public List<LentBook> GetLentBooksForUserByBook(int bookId, int userId)
        {
            return _context.LentBooks.Where(lb => lb.BookID == bookId && lb.Membership.UserID == userId).ToList();
        }

        public List<LentBook> GetLentBooksForUser(int userId)
        {
            return _context.LentBooks
                .Include(lb => lb.Book)
                .ThenInclude(b => b.Author)
                .ThenInclude(a => a.Library)
                .Include(lb => lb.Book.CoverImage)
                .Where(lb => lb.Membership.UserID == userId && lb.ReturnTime == default(DateTime)).ToList();
        }

        public List<LentBook> GetLentBooksForMembership(int membershipId)
        {
            return _context.LentBooks
                .Include(lb => lb.Book)
                .ThenInclude(b => b.Author)
                .Include(lb => lb.Book.CoverImage)
                .Where(lb => lb.MembershipID == membershipId).ToList();
        }

        public List<LentBook> GetActiveLentBooksForMembership(int membershipId)
        {
            return _context.LentBooks
                .Include(lb => lb.Book)
                .ThenInclude(b => b.Author)
                .Include(lb => lb.Book.CoverImage)
                .Where(lb => lb.MembershipID == membershipId && lb.ReturnTime == default(DateTime)).ToList();
        }

        public LentBook LendBook(int bookId, int membershipId, LendBookAddVM data)
        {
            var item = new LentBook()
            {
                BookID = bookId,
                MembershipID = membershipId,
                LentAt = DateTime.Now,
                ReturnDeadline = data.ReturnDeadline,
                ReturnTime = default(DateTime),
            };

            _context.LentBooks.Add(item);
            _context.SaveChanges();

            return item;
        }

        public List<Book> SearchBooks(string filter)
        {
            if (string.IsNullOrEmpty(filter))
            {
                return _context.Books.Include(b=>b.Author).Include(b => b.CoverImage).ToList();
            }
            else
            {
                return _context.Books.Include(b=>b.Author).Include(b => b.CoverImage).Where(b=>b.Title.ToLower()
                .Contains(filter.ToLower())).ToList();
            }
        }

        public Book UpdateBook(BookUpdateVM data)
        {
            Book book = _context.Books.Include(b=>b.Author).FirstOrDefault(x=>x.ID==data.id);
            book.Title = data.Title;
            book.Description = data.Description;
            book.NumberOfCopies = data.NumberOfCopies;
            book.UpdatedAt=DateTime.Now;
            _context.SaveChanges();
            return book;
        }

        public List<LentBook> GetLentBooksByBook(int bookId)
        {
            return _context.LentBooks.Where(lb => lb.BookID == bookId && lb.ReturnTime == default(DateTime)).ToList();
        }

        public BookTag AddBookTag(TagAddVM data)
        {
            var tag = new BookTag
            {
                BookID = data.BookID,
                Title = data.Title,
                Content = data.Content,
            };
            _context.Add(tag);
            _context.SaveChanges();
            return tag;
        }

        public BookTag GetBookTag(int Id)
        {
            var bookTag = _context.BookTags.Include(b=>b.Book).FirstOrDefault(x=>x.ID==Id);
            return bookTag;
        }

        public List<BookTag> GetTagsByBook(int bookId)
        {
            var tagList = _context.BookTags.Include(b=>b.Book).Where(x=>x.BookID==bookId).ToList();
            return tagList;
        }

        public bool RemoveTag(int id)
        {
            try
            {
                var tag = _context.BookTags.FirstOrDefault(t => t.ID == id);
                _context.Remove(tag);
                _context.SaveChanges();
            }
            catch (System.Exception)
            {

                return false;
            }
            return true;
        }

        public Series CreateSeries(CreateSeriesVM data)
        {
            Series series = new Series
            {
                Name = data.Name,
                LibraryID= data.LibraryID,
            };
            _context.Add(series);
            _context.SaveChanges();
            return series;
        }

        public Series GetSeries(int id)
        {
            return _context.Series.FirstOrDefault(s => s.ID == id);
        }

        public List<Series> GetSeriesPerLibraryId(int libraryID, string filter)
        {
            if (string.IsNullOrEmpty(filter))
            {
                return _context.Series.Where(b => b.LibraryID == libraryID).ToList();
            }
            else
            {
                return _context.Series.Where(b => b.LibraryID == libraryID && b.Name.ToLower().Contains(filter.ToLower())).ToList();
            }

        }

        public BookSeries AddBookToSeries(int BookID, int SeriesID)
        {
            var item = new BookSeries { BookID = BookID, SeriesID = SeriesID };
            _context.Add(item);
            _context.SaveChanges();
            return item;
        }

        public List<Series> GetSeriesByBook(int id)
        {
            List<Series> series = new List<Series>();
            var results = _context.BookSeries.Include(b => b.Series).Where(b => b.BookID == id).ToList();
            foreach (var result in results)
            {
                series.Add(result.Series);
            }
            return series;
        }

        public List<Book> GetBooksBySeries(int id)
        {
            List<Book> books = new List<Book>();
            var results = _context.BookSeries.Include(b => b.Book).Include(b=>b.Book.Author).Include(b=>b.Book.CoverImage).Where(b => b.SeriesID == id).ToList();
            foreach (var result in results)
            {
                books.Add(result.Book);
            }
            return books;
        }

        public bool RemoveBookFromSeries(int BookID, int SeriesID)
        {
            
            try
            {
                var bookSeries = _context.BookSeries.FirstOrDefault(bs => bs.BookID == BookID && bs.SeriesID == SeriesID);
                _context.Remove(bookSeries);
                _context.SaveChanges();
            }
            catch (System.Exception)
            {

                return false;
            }
            return true;
        }

        public LentBook GetLentBook(int lentBookId)
        {
            var item = _context.LentBooks.Include(lb => lb.Book).ThenInclude(b => b.Author).Where( lb => lb.LentBookID == lentBookId).First();

            return item;
        }

        public LentBook RegisterReturn(int lentBookId)
        {
            var item = _context.LentBooks.Find(lentBookId);

            item.ReturnTime = DateTime.Now;
            _context.SaveChanges();

            return item;
        }

        public List<Book> GetLibrarianRecommendations(int libraryID)
        {   List<Book> books = new List<Book> ();
            var library = _context.Libraries.FirstOrDefault(x=>x.ID == libraryID);
            var items = _context.BookSeries.Where(bs=>bs.SeriesID == library.LibrarianRecommendationsID);
            foreach (var item in items) 
            {
                books.Add(item.Book);
            }
            return books;
        }

        public int GetLibraryRecommendationID(int libraryID)
        {
            var library = _context.Libraries.Include(l=>l.LibrarianRecommendations).FirstOrDefault(x=>x.ID==libraryID);
            return library.LibrarianRecommendations.ID;
        }
    }
}
