namespace eBibliotekaServer.LibraryModule.ViewModels
{
    public class PaymentCreateVM
    {
        public string Reason { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public int MembershipID { get; set; }
    }
}
