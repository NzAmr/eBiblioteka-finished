using System;

namespace eBibliotekaServer.BookModule.ViewModels
{
    public class LentBookListVM
    {
        public int Id { get; set; }
        public DateTime LentAt { get; set; }
        public DateTime ReturnDeadline { get; set; }
        public DateTime ReturnTime { get; set; }
        public Boolean Returned { get; set; }
    }
}
