using eBibliotekaServer.AuthModule.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.LibraryModule.Models
{
    public class Notification
    {   [Key]
        public int ID { get; set; }
        public int? SenderID { get; set; }
        [ForeignKey(nameof(SenderID))]
        public Librarian Sender { get; set; }
        public int? RecipientID { get; set; }
        [ForeignKey(nameof(RecipientID))]
        public User Recipient { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}
