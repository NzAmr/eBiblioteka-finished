using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.LibraryModule.Models
{
    public class BusinessHours
    {
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public bool WorkingDay { get; set; }
        public int LibraryID { get; set; }
        [ForeignKey(nameof(LibraryID))]
        public Library Library { get; set; }
    }
}
