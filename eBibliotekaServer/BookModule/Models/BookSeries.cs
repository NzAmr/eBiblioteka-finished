using eBibliotekaServer.LibraryModule.Models;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.BookModule.Models
{
    public class BookSeries
    {
        public int? BookID { get; set; }
        [ForeignKey(nameof(BookID))]
        public Book Book { get; set; }

        public int? SeriesID { get; set; }
        [ForeignKey(nameof(SeriesID))]
        public Series Series { get; set; }
    }
}
