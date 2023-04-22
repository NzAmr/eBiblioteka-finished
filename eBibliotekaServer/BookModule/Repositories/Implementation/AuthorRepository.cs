using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.BookModule.ViewModels;
using eBibliotekaServer.Data;
using System.Collections.Generic;
using System.Linq;

namespace eBibliotekaServer.BookModule.Repositories.Implementation
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly AppDbContext _context;

        public AuthorRepository(AppDbContext context)
        {
            _context = context;
        }
        public Author AddAuthor(string name,int libraryID)
        {
            Author author = new Author() { Name = name , LibraryID=libraryID};
                _context.Authors.Add(author);
                _context.SaveChanges();
                return author;     
        }

        public Author GetAuthor(int id)
        {
            return _context.Authors.FirstOrDefault(x => x.ID == id);
        }

        public bool RemoveAuthor(int id)
        {
            try
            {
                var author = _context.Authors.FirstOrDefault(a => a.ID == id);
                _context.Remove(author);
                _context.SaveChanges();
            }
            catch (System.Exception)
            {

                return false;
            }
            return true;
        }

        public List<Author> SearchAuthors(int libraryID, string
            filter = "" )
        {
            if (string.IsNullOrEmpty(filter))
            {
                return _context.Authors.Where(x=>x.LibraryID==libraryID).ToList();
            }
            else 
            {
                return _context.Authors.Where(x => x.Name.ToLower().Contains(filter.ToLower())&& x.LibraryID==libraryID).ToList();
            }
        }

        public Author UpdateAuthor(int id, AuthorListVM data)
        {
            var item = _context.Authors.FirstOrDefault(a=>a.ID==data.ID);
            if (item == null)
            {
                return null;
            }
            item.Name = data.Name;
            _context.SaveChanges();
            return item;
        }
    }
}
