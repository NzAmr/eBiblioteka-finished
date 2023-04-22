using System;

namespace eBibliotekaServer.BookModule.ViewModels
{
    public class LentBookAvailabilityVM
    {
        public DateTime LentAt { get; set; }
        public DateTime ReturnDeadline { get; set; }
    }
}
