using System;

namespace eBibliotekaServer.BookModule.ViewModels
{
    public class UserLentBookVM
    {
        public int BookID { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string LibraryName { get; set; }
        public string CoverImage { get; set; }
        public DateTime ReturnDeadline { get; set; }
    }
}
