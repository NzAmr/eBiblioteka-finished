

using eBibliotekaServer.ImageModule.Models;
using eBibliotekaServer.LocationModule.ViewModels;
using eBibliotekaServer.MembershipModule.Models;
using System.Collections.Generic;

namespace eBibliotekaServer.LibraryModule.ViewModels
{
    public class LibraryDetailsVM
    {
        public string Name { get; set; }
        public string About { get; set; }
        public Image ProfileImage { get; set; }
        public Image BannerImage { get; set; }
        public List<MembershipOfferGetVM> MembershipOffers { get; set; }
        public List<BusinessHoursGetVM> BusinessHours { get; set; }
        public Membership membership { get; set; }
        public LocationVM Location { get; set; }
    }
}
