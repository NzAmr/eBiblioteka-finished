using eBibliotekaServer.AuthModule.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.LibraryModule.ViewModels
{
    public class NotificationListItemVM
    {
        public int ID { get; set; }
        public Librarian Sender { get; set; }
        public string Text { get; set; }
    }
}
