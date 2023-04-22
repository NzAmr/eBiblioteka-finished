using eBibliotekaServer.LibraryModule.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.BookModule.Models
{
    public class Author
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }

        public int LibraryID { get; set; }
        [ForeignKey(nameof(LibraryID))]
        public Library Library { get; set; }
    }
}
