

using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.ImageModule.Models;

namespace eBibliotekaServer.BookModule.ViewModels
{
    public class BookSearchVM
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Author  { get; set; }
        public string CoverImage  { get; set; }
        
    }
}
