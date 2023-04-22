using eBibliotekaServer.MembershipModule.Models;
using System;

namespace eBibliotekaServer.BookModule.Models
{
    public class LentBook
    {
        public int LentBookID { get; set; }
        public DateTime LentAt { get; set; }
        public DateTime ReturnDeadline { get; set; }
        public DateTime ReturnTime { get; set; }

        public int BookID { get; set; }
        public Book Book { get; set; }

        public int MembershipID { get; set; }
        public Membership Membership { get; set; }
    }
}
