using eBibliotekaServer.ImageModule.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.AuthModule.Models
{
    public class Account
    {
        [Key]
        public int ID { get; set; }
        public string Email { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public byte[] Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? ProfileImageID { get; set; }
        [ForeignKey(nameof(ProfileImageID))]
        public Image ProfileImage { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
