using eBibliotekaServer.MembershipModule.Models;

namespace eBibliotekaServer.BookModule.ViewModels
{
    public class RegisterLendingSummaryVM
    {
        public BookSearchVM Book { get; set; }
        public MemberListVM Member { get; set; }
        public int NumberOfCopies { get; set; }
        public int CopiesRemaining { get; set; }
    }
}
