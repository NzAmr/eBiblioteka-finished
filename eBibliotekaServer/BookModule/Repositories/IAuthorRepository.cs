using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.BookModule.ViewModels;
using System.Collections.Generic;

namespace eBibliotekaServer.BookModule.Repositories
{
    public interface IAuthorRepository
    {
        Author AddAuthor(string name,int libraryID);
        Author GetAuthor(int id);
        List<Author> SearchAuthors(int libraryID,string filter);
        Author UpdateAuthor(int id, AuthorListVM data);
        bool RemoveAuthor(int id);


    }
}
