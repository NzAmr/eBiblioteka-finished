using eBibliotekaServer.AuthModule.Models;
using eBibliotekaServer.AuthModule.ViewModels;
using eBibliotekaServer.Data;
using eBibliotekaServer.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Text;

namespace eBibliotekaServer.AuthModule.Repositories.Implementation
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _context;



        public AuthRepository(AppDbContext context)
        {
            _context = context;
        }

        public bool CheckUsername(string username, AccountType accType)
        {
            if (accType == AccountType.User)
            {
                var user = _context.Users.FirstOrDefault(u => u.Username == username);

                return (user == null) ? true : false;
            }
            else
            {
                var librarian = _context.Librarians.FirstOrDefault(l => l.Username == username);

                return (librarian == null) ? true : false;
            }
        }

        /* KORISNIK */

        public User RegisterUser(UserRegisterVM data)
        {
            var user = new User
            {
                Email = data.Email,
                Username = data.Username,
                Password = AuthHelper.GenerateSaltedHash(Encoding.UTF8.GetBytes(data.Password)),
                FirstName = data.FirstName,
                LastName = data.LastName,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public User LoginUser(LoginVM data)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == data.Username);

            if (user == null) { throw new Exception(nameof(user)); }

            if (AuthHelper.ConfirmPassword(Encoding.UTF8.GetBytes(data.Password), user.Password))
            {
                return user;
            }
            else
            {
                throw new Exception(nameof(user));
            }
        }

        public User GetUser(int id)
        {
            return _context.Users.Include(u => u.ProfileImage).FirstOrDefault(u => u.ID == id);
        }

        public User UpdateUser(int id, AccountUpdateVM data)
        {
            var user = _context.Users.FirstOrDefault(u => u.ID == id);

            user.Email = data.Email;
            user.Username = data.Username;
            user.FirstName = data.FirstName;
            user.LastName = data.LastName;
            user.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
            return user;
        }

        public User UpdateUserPassword(int id, string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.ID == id);

            user.Password = AuthHelper.GenerateSaltedHash(Encoding.UTF8.GetBytes(password));
            user.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
            return user;
        }

        /* BIBLIOTEKAR */

        public Librarian RegisterLibrarian(LibrarianRegisterVM data, int libraryID)
        {
            var librarian = new Librarian
            {
                Email = data.Email,
                Username = data.Username,
                Password = AuthHelper.GenerateSaltedHash(Encoding.UTF8.GetBytes(data.Password)),
                FirstName = data.FirstName,
                LastName = data.LastName,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                LibraryID = libraryID
            };

            _context.Librarians.Add(librarian);
            _context.SaveChanges();

            return librarian;
        }

        public Librarian LoginLibrarian(LoginVM data)
        {
            var librarian = _context.Librarians.FirstOrDefault(l => l.Username == data.Username);

            if (librarian == null) { throw new Exception(nameof(librarian)); }

            if (AuthHelper.ConfirmPassword(Encoding.UTF8.GetBytes(data.Password), librarian.Password))
            {
                return librarian;
            }
            else
            {
                throw new Exception(nameof(librarian));
            }
        }

        public Librarian GetLibrarian(int id)
        {
            return _context.Librarians.Include(l => l.Library).Include(l => l.ProfileImage).FirstOrDefault(u => u.ID == id);
        }

        public Librarian UpdateLibrarian(int id, AccountUpdateVM data)
        {
            var librarian = _context.Librarians.FirstOrDefault(u => u.ID == id);

            librarian.Email = data.Email;
            librarian.Username = data.Username;
            librarian.FirstName = data.FirstName;
            librarian.LastName = data.LastName;
            librarian.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
            return librarian;
        }

        public Librarian UpdateLibrarianPassword(int id, string password)
        {
            var librarian = _context.Librarians.FirstOrDefault(u => u.ID == id);

            librarian.Password = AuthHelper.GenerateSaltedHash(Encoding.UTF8.GetBytes(password));
            librarian.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
            return librarian;
        }

        public bool SaveChanges() => (_context.SaveChanges() >= 0);
    }
}
