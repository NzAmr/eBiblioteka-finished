using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.ImageModule.Models;
using eBibliotekaServer.LocationModule.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.LibraryModule.Models
{
    public class Library
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        public string About { get; set; }
        public int? ProfileImageID { get; set; }
        [ForeignKey(nameof(ProfileImageID))]
        public Image ProfileImage { get; set; }
        public int? BannerImageID { get; set; }
        [ForeignKey(nameof(BannerImageID))]
        public Image BannerImage { get; set; }
        public int? LocationID { get; set; }
        [ForeignKey(nameof(LocationID))]
        public int? LibrarianRecommendationsID { get; set; }
        [ForeignKey(nameof(LibrarianRecommendationsID))]
        public Series LibrarianRecommendations { get; set; }
        public Location Location { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
