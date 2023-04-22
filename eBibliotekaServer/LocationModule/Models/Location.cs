using System.ComponentModel.DataAnnotations.Schema;

namespace eBibliotekaServer.LocationModule.Models
{
    public class Location
    {
        public int ID { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "decimal(18,15)")]
        public decimal Latitude { get; set; }
        [Column(TypeName = "decimal(18,15)")]
        public decimal Longitude { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Zoom { get; set; }
    }
}
