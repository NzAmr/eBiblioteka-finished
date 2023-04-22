using eBibliotekaServer.BookModule.Models;
using System;

namespace eBibliotekaServer.BookModule.ViewModels
{
    public class LentBookDetailedListVM
    {
        public int ID { get; set; }
        public DateTime LentAt { get; set; }
        public DateTime ReturnDeadline { get; set; }
        public DateTime ReturnTime { get; set; }
        public bool Returned { get; set; }  
        public Book Book { get; set; }
    }
}
