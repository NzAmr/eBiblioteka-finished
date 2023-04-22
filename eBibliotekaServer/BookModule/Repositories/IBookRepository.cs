using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.BookModule.ViewModels;
using System.Collections.Generic;

namespace eBibliotekaServer.BookModule.Repositories
{
    public interface IBookRepository
    {
        Book AddBook(BookAddVM data);
        Book GetBook(int id);
        List<Book> SearchBooks(string filter);
        Book UpdateBook(BookUpdateVM data);
        LentBook LendBook(int bookId, int membershipId, LendBookAddVM data);
        LentBook RegisterReturn(int lentBookId);
        LentBook GetLentBook(int lentBookId);
        List<LentBook> GetLentBooksByBook(int bookId);
        List<LentBook> GetLentBooksForUser(int userId);
        List<LentBook> GetLentBooksForUserByBook(int bookId, int userId);
        List<LentBook> GetLentBooksForMembership(int membershipId);
        List<LentBook> GetActiveLentBooksForMembership(int membershipId);
        BookTag AddBookTag(TagAddVM data);
        BookTag GetBookTag(int Id);
        List<BookTag> GetTagsByBook(int bookId);
        bool RemoveTag(int id);
        Series CreateSeries(CreateSeriesVM data);
        Series GetSeries(int id);
        List<Series> GetSeriesPerLibraryId(int libraryID,string filter);
        BookSeries AddBookToSeries(int BookID, int SeriesID);
        List<Series> GetSeriesByBook(int id);
        List<Book> GetBooksBySeries(int id);
        List<Book> GetLibrarianRecommendations(int libraryID);
        bool RemoveBookFromSeries(int BookID, int SeriesID);
        int GetLibraryRecommendationID(int libraryID);
    }
}
