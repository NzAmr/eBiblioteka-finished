using eBibliotekaServer.LibraryModule.ViewModels;
using eBibliotekaServer.MembershipModule.Models;
using System.Collections.Generic;

namespace eBibliotekaServer.MembershipModule.Repositories
{
    public interface IMembershipRepository
    {
        public Membership Subscribe(int membershipOfferID, int userID);
        public Membership Extend(int membershipOfferID, int membershipId);
        public Membership GetMember(int libraryID, int userID);
        public Membership GetMembership(int membershipID);
        public List<Membership> SearchMembershipsByLibrary(int libraryID, string filter);
        public bool IsMember(int libraryID, int userID);
        public Payment AddPayment(PaymentCreateVM data);
        public List<Payment> GetPaymentsForMembership(int id);
    }
}
