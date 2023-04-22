using System;
using System.Collections.Generic;
using System.Linq;
using eBibliotekaServer.Data;
using eBibliotekaServer.LibraryModule.Models;
using eBibliotekaServer.LibraryModule.ViewModels;
using eBibliotekaServer.LocationModule.Models;
using Microsoft.EntityFrameworkCore;

namespace eBibliotekaServer.LibraryModule.Repositories.Implementation
{
    public class LibraryRepository : ILibraryRepository
    {
        private readonly AppDbContext _context;

        public LibraryRepository(AppDbContext context)
        {
            _context = context;
        }

        public Library RegisterLibrary(string name)
        {
            var library = new Library
            {
                Name = name,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Libraries.Add(library);
            _context.SaveChanges();

            return library;
        }
        public Library CreateRecommendations(int libraryID , int recommendationsID)
        {
            var library = _context.Libraries.FirstOrDefault(x => x.ID == libraryID);
            library.LibrarianRecommendationsID = recommendationsID;
            _context.SaveChanges();
            return library;
        }
        public List<Library> SearchLibraries(string filter)
        {
            if (!string.IsNullOrEmpty(filter))
            {
                return _context.Libraries.Include(l => l.BannerImage).Include(l => l.ProfileImage).Include(l => l.Location).Where(l => l.Name.ToLower().Contains(filter.ToLower())).ToList();
            }
            else
            {
                return _context.Libraries.Include(l => l.BannerImage).Include(l => l.ProfileImage).Include(l => l.Location).ToList();
            }
        }

        public Library GetLibrary(int id)
        {
            return _context.Libraries.Include(l => l.BannerImage).Include(l => l.ProfileImage).Include(l => l.Location).Include(l => l.LibrarianRecommendations).FirstOrDefault(l => l.ID == id);
        }

        public Library UpdateLibrary(int id, LibraryUpdateVM data)
        {
            var item = _context.Libraries.FirstOrDefault(l => l.ID == id);

            if (item == null) return null;

            item.Name = data.Name;
            item.About = data.About;

            _context.SaveChanges();
            return item;
        }

        public bool SaveChanges() => (_context.SaveChanges() >= 0);

        public MembershipOffer CreateMembershipOffer(int libraryId,MembershipOfferCreateVM data)
        {
            var offer = new MembershipOffer()
            {
                Title = data.Title,
                Description = data.Description,
                Price = data.Price,
                AddedMonths = data.AddedMonths,
                NoOfBooks = data.NoOfBooks,
                Active = true,
                LibraryID = libraryId
            };

            _context.MembershipOffers.Add(offer);
            _context.SaveChanges();

            return offer;
        }

        public MembershipOffer GetMembershipOffer(int id)
        {
            return _context.MembershipOffers.FirstOrDefault(mo => mo.ID == id);
        }

        public List<MembershipOffer> GetMembershipOffers(int libraryId)
        {
            return _context.MembershipOffers.Where(mo => mo.LibraryID == libraryId).ToList();
        }

        public MembershipOffer UpdateMembershipOffer(int id, MembershipOfferUpdateVM data)
        {
            var item = _context.MembershipOffers.FirstOrDefault(mo => mo.ID == id);

            if (item == null) return null;

            item.Title = data.Title;
            item.Description = data.Description;
            item.Price = data.Price;
            item.AddedMonths = data.AddedMonths;
            item.NoOfBooks = data.NoOfBooks;
            item.Active = data.Active;

            _context.SaveChanges();
            return item;
        }

        public MembershipOffer DeleteMembershipOffer(int id)
        {
            var item = _context.MembershipOffers.FirstOrDefault(mo => mo.ID == id);

            if (item == null) return null;

            _context.MembershipOffers.Remove(item);
            _context.SaveChanges();
            return item;
        }

        public BusinessHours GetBusinessHour(int id)
        {
            return _context.BusinessHours.Where(bh => bh.ID == id).FirstOrDefault();
        }

        public List<BusinessHours> GetBusinessHours(int libraryId)
        {
            return _context.BusinessHours.Where(bh => bh.LibraryID == libraryId).ToList();
        }

        public BusinessHours CreateBusinessHours(int libraryId, BusinessHoursCreateVM data)
        {
            var item = new BusinessHours()
            {
                LibraryID = libraryId,
                Title = data.Title,
                TimeFrom = data.TimeFrom,
                TimeTo = data.TimeTo,
                WorkingDay = data.WorkingDay
            };

            _context.BusinessHours.Add(item);
            _context.SaveChanges();

            return item;
        }

        public BusinessHours UpdateBusinessHours(int id, BusinessHoursCreateVM data)
        {
            var item = _context.BusinessHours.Where(bh => bh.ID == id).FirstOrDefault();

            if(item == null) return null;

            item.Title = data.Title;
            item.TimeFrom = data.TimeFrom;
            item.TimeTo = data.TimeTo;
            item.WorkingDay = data.WorkingDay;

            _context.BusinessHours.Update(item);
            _context.SaveChanges();

            return item;
        }

        public BusinessHours DeleteBusinessHours(int id)
        {
            var item = _context.BusinessHours.Where(bh => bh.ID == id).FirstOrDefault();

            if (item == null) return null;

            _context.BusinessHours.Remove(item);
            _context.SaveChanges();

            return item;
        }

        public List<Library> GetLibrariesForUser(int userId)
        {
            var memberships = _context.Membership
                .Include(m => m.MembershipOffer).Where(m => m.Active && m.UserID == userId).ToList();

            List<Library> result = new List<Library>();

            foreach (var item in memberships)
            {
                result.Add(_context.Libraries
                    .Include(l => l.BannerImage)
                    .Include(l => l.ProfileImage)
                    .Where(l => l.ID == item.MembershipOffer.LibraryID).FirstOrDefault());
            }

            return result;
        }

        public List<Library> SearchLibrariesMap()
        {
            return _context.Libraries.Include(l => l.Location).Where(l => l.LocationID != null && l.LocationID != default(int)).ToList();
        }

        public Notification SendNotification(SendNotificationVM data,int libraryID)
        {
            var notification = new Notification { RecipientID = data.RecipientID ,SenderID= libraryID, Text = data.Text , Date = DateTime.Now};
            _context.Notifications.Add(notification);
            _context.SaveChanges();
            return notification;
        }

        public List<Notification> GetNotificationsForUser(int userID)
        {
            var items = _context.Notifications.Include(n => n.Sender).Include(n => n.Recipient).Include(n => n.Sender.Library).Where(n=>n.Recipient.ID == userID).ToList();
            return items;
        }

        public Notification GetNotification(int id)
        {
            return _context.Notifications.Include(n => n.Sender).Include(n => n.Recipient).FirstOrDefault(n=>n.ID == id);
        }

        public bool RemoveNotification(int id)
        {
            var item = _context.Notifications.FirstOrDefault(n=>n.ID==id);
            if (item == null)
            {
                return false;
            }
            _context.Notifications.Remove(item);
            _context.SaveChanges();
            return true;
        }
    }
}
