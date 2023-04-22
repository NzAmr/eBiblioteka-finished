using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.BookModule.Models
{
    public class BookTag
    {
        [Key]
        public int ID { get; set; }
        public int? BookID { get; set; }
        [ForeignKey(nameof(BookID))]
        public Book Book { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

    }
}
