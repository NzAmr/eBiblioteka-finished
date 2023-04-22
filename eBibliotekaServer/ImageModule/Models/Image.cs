using System;
using System.ComponentModel.DataAnnotations;

namespace eBibliotekaServer.ImageModule.Models
{
    public class Image
    {
        [Key]
        public int ID { get; set; }
        public string Path { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
