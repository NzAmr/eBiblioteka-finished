using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.MembershipModule.Models
{
    public class Payment
    {
        public int ID { get; set; }
        public string Reason { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime TimeOfPayment { get; set; }
        public int MembershipID { get; set; }

        [ForeignKey(nameof(MembershipID))]
        public Membership Membership { get; set; }
    }
}
