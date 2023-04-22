using eBibliotekaServer.MembershipModule.Models;
using System.Collections.Generic;

namespace eBibliotekaServer.AuthModule.Models
{
    public class User : Account
    {
        public ICollection<Membership> Memberships { get; set; }
    }
}
