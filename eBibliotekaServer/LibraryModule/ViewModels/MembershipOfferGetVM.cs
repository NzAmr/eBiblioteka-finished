namespace eBibliotekaServer.LibraryModule.ViewModels
{
    public class MembershipOfferGetVM
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int AddedMonths { get; set; }
        public int NoOfBooks { get; set; }
        public bool Active { get; set; }
    }
}
