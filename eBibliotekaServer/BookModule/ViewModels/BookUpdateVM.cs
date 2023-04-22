using eBibliotekaServer.BookModule.Models;

namespace eBibliotekaServer.BookModule.ViewModels
{
    public class BookUpdateVM
    {
        public int id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfCopies { get; set; }
    }
}
