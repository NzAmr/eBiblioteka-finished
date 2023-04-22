using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.ImageModule.Models;

namespace eBibliotekaServer.BookModule.ViewModels
{
    public class BookDetailsVM
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfCopies { get; set; }
        public int CopiesRemaining { get; set; }
        public Image CoverImage { get; set; }
        public Author Author { get; set; }
    }
}
