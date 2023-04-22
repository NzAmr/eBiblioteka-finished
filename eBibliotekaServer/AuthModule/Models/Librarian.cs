using eBibliotekaServer.LibraryModule.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.AuthModule.Models
{
    public class Librarian : Account
    {
        public int LibraryID { get; set; }
        [ForeignKey(nameof(LibraryID))]
        public Library Library { get; set; }
    }
}
