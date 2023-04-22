using eBibliotekaServer.LocationModule.ViewModels;

namespace eBibliotekaServer.LibraryModule.ViewModels
{
    public class LibraryListVM
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string About { get; set; }
        public string ProfileImage { get; set; }
        public string BannerImage { get; set; }
        public bool IsMember { get; set; }
        public LocationVM Location { get; set; }
    }
}
