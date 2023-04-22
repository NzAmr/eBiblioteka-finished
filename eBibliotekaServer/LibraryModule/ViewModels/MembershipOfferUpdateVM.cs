namespace eBibliotekaServer.LibraryModule.ViewModels
{
    public class MembershipOfferUpdateVM
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int AddedMonths { get; set; }
        public int NoOfBooks { get; set; }
        public bool Active { get; set; }
    }
}
