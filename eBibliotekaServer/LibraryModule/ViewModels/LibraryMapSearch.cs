using eBibliotekaServer.LocationModule.ViewModels;

namespace eBibliotekaServer.LibraryModule.ViewModels
{
    public class LibraryMapSearch
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public decimal Zoom { get; set; }
    }
}
