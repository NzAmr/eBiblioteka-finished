using eBibliotekaServer.AuthModule.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.LibraryModule.ViewModels
{
    public class SendNotificationVM
    {
        
        public int? RecipientID { get; set; }
        [ForeignKey(nameof(RecipientID))]
        public User Recipient { get; set; }
        public string Text { get; set; }
    }
}
