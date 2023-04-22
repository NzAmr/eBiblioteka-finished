using System;

namespace eBibliotekaServer.MembershipModule.Models
{
    public class MemberListVM
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfileImage { get; set; }
        public DateTime JoinDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public decimal Debt { get; set; }
    }
}
