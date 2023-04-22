using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.BookModule.ViewModels;
using eBibliotekaServer.LibraryModule.ViewModels;
using eBibliotekaServer.MembershipModule.Models;
using System;
using System.Collections.Generic;

namespace eBibliotekaServer.MembershipModule.ViewModels
{
    public class MemberDetailsVM : MemberListVM
    {
        public int NoOfLentBooks { get; set; }
        public MembershipOfferGetVM MembershipOffer { get; set; }
        public List<LentBookDetailedListVM> LentBooks { get; set; }
        public List<PaymentListVM> Payments { get; set; }
    }
}
