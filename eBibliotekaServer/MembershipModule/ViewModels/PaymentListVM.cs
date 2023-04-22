using System;

namespace eBibliotekaServer.MembershipModule.ViewModels
{
    public class PaymentListVM
    {
        public int ID { get; set; }
        public string Reason { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime TimeOfPayment { get; set; }
    }
}
