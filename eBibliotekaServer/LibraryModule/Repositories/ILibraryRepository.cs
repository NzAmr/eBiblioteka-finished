using eBibliotekaServer.LibraryModule.Models;
using eBibliotekaServer.LibraryModule.ViewModels;
using eBibliotekaServer.LocationModule.Models;
using System.Collections.Generic;

namespace eBibliotekaServer.LibraryModule.Repositories
{
    public interface ILibraryRepository
    {
        Library RegisterLibrary(string name);
        List<Library> SearchLibraries(string filter);
        List<Library> SearchLibrariesMap();
        Library GetLibrary(int id);
        List<Library> GetLibrariesForUser(int userId);
        Library UpdateLibrary(int id, LibraryUpdateVM data);

        MembershipOffer CreateMembershipOffer(int libraryId, MembershipOfferCreateVM data);
        MembershipOffer UpdateMembershipOffer(int id, MembershipOfferUpdateVM data);
        MembershipOffer DeleteMembershipOffer(int id);
        MembershipOffer GetMembershipOffer(int id);
        List<MembershipOffer> GetMembershipOffers(int libraryId);

        BusinessHours GetBusinessHour(int id);
        List<BusinessHours> GetBusinessHours(int libraryId);
        BusinessHours CreateBusinessHours(int libraryId, BusinessHoursCreateVM data);
        BusinessHours UpdateBusinessHours(int id, BusinessHoursCreateVM data);
        BusinessHours DeleteBusinessHours(int id);
        public Library CreateRecommendations(int libraryID, int recommendationsID);
        public Notification SendNotification(SendNotificationVM data, int libraryID);
        public List<Notification> GetNotificationsForUser(int userID);
        public Notification GetNotification(int id);
        public bool RemoveNotification(int id);
        bool SaveChanges();
    }
}
