using eBibliotekaServer.ImageModule.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.BookModule.Models
{
    public class Book
    {
        [Key]
        public int ID {  get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfCopies { get; set; }
        public int? CoverImageID { get; set; }
        [ForeignKey(nameof(CoverImageID))]
        public Image CoverImage { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public virtual ICollection<BookSeries> BookSeries { get; set; }
        public int? AuthorID { get; set; }
        [ForeignKey(nameof(AuthorID))]
        public Author Author { get; set; }
    }
}
