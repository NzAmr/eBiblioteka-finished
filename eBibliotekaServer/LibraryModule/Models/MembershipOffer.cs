using eBibliotekaServer.MembershipModule.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.LibraryModule.Models
{
    public class MembershipOffer
    {
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int AddedMonths { get; set; }
        public int NoOfBooks { get; set; }
        public bool Active { get; set; }
        public int LibraryID { get; set; }
        [ForeignKey(nameof(LibraryID))]
        public Library Library { get; set; }
    }
}
