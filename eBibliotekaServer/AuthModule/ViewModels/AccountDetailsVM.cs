using eBibliotekaServer.ImageModule.Models;
using System;

namespace eBibliotekaServer.AuthModule.ViewModels
{
    public class AccountDetailsVM
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Image ProfilePicture { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
