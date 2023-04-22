using eBibliotekaServer.AuthModule.Models;
using eBibliotekaServer.LibraryModule.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace eBibliotekaServer.MembershipModule.Models
{
    public class Membership
    {
        [Key]
        public int ID { get; set; }
        public decimal Debt { get; set; }
        public bool Active { get; set; }
        public DateTime JoinDate { get; set; }
        public DateTime ExpirationDate { get; set; }

        public int UserID { get; set; } 
        public User User { get; set; }

        public int MembershipOfferID { get; set; }
        public MembershipOffer MembershipOffer { get; set; }
    }
}
