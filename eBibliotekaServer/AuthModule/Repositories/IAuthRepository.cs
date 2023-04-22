using eBibliotekaServer.AuthModule.ViewModels;
using eBibliotekaServer.AuthModule.Models;

namespace eBibliotekaServer.AuthModule.Repositories
{
    public interface IAuthRepository
    {
        bool CheckUsername(string username, AccountType accType);

        User RegisterUser(UserRegisterVM data);
        User LoginUser(LoginVM data);
        User GetUser(int id);
        User UpdateUser(int id, AccountUpdateVM data);
        User UpdateUserPassword(int id, string password);


        Librarian RegisterLibrarian(LibrarianRegisterVM data, int libraryID);
        Librarian LoginLibrarian(LoginVM data);
        Librarian GetLibrarian(int id);
        Librarian UpdateLibrarian(int id, AccountUpdateVM data);
        Librarian UpdateLibrarianPassword(int id, string password);

        bool SaveChanges();
    }
}
