using eBibliotekaServer.Data;
using eBibliotekaServer.LibraryModule.ViewModels;
using eBibliotekaServer.MembershipModule.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eBibliotekaServer.MembershipModule.Repositories.Implementation
{
    public class MembershipRepository : IMembershipRepository
    {
        private readonly AppDbContext _context;

        public MembershipRepository(AppDbContext context)
        {
            _context = context;
        }

        public Payment AddPayment(PaymentCreateVM data)
        {
            var payment = new Payment()
            {
                Reason = data.Reason,
                Amount = data.Amount,
                PaymentMethod = data.PaymentMethod,
                TimeOfPayment = DateTime.Now,
                MembershipID = data.MembershipID,
            };

            _context.Add(payment);
            _context.SaveChanges();

            return payment;
        }

        public Membership GetMember(int libraryID, int userID)
        {
            var item = _context.Membership.Include(m => m.MembershipOffer).Where(m => m.UserID == userID && m.MembershipOffer.LibraryID == libraryID).FirstOrDefault();

            return item;
        }

        public Membership GetMembership(int membershipID)
        {
            var item = _context.Membership
                .Include(m => m.MembershipOffer)
                .Include(m => m.User)
                .ThenInclude(u => u.ProfileImage)
                .Where(m => m.ID == membershipID).FirstOrDefault();

            return item;
        }

        public List<Membership> SearchMembershipsByLibrary(int libraryID, string filter)
        {
            List<Membership> items;

            if(string.IsNullOrEmpty(filter))
            {
                items = _context.Membership.Include(m => m.User).Include(m => m.User.ProfileImage).Where(m => m.MembershipOffer.LibraryID == libraryID).ToList();

            }
            else
            {
                items = _context.Membership.Include(m => m.User).Include(m => m.User.ProfileImage)
                    .Where(m => m.MembershipOffer.LibraryID == libraryID &&  (
                    m.User.Username.ToLower().Contains(filter.ToLower()) ||
                    m.User.Email.ToLower().Contains(filter.ToLower()) ||
                    m.User.FirstName.ToLower().Contains(filter.ToLower()) ||
                    m.User.FirstName.ToLower().Contains(filter.ToLower()) ||
                    (m.User.FirstName.ToLower() + " " + m.User.LastName.ToLower()).Contains(filter.ToLower())
                    ))
                    .ToList();
            }


            return items;
        }

        public bool IsMember(int libraryID, int userID)
        {
            var item = _context.Membership.Where(m => m.UserID == userID && m.MembershipOffer.LibraryID == libraryID).FirstOrDefault();

            if(item != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public Membership Subscribe(int membershipOfferID, int userID)
        {
            var offer = _context.MembershipOffers.FirstOrDefault(mo => mo.ID == membershipOfferID);

            var membership = _context.Membership.Include(m => m.MembershipOffer).Where(m => m.UserID == userID && m.MembershipOffer.LibraryID == offer.LibraryID).FirstOrDefault();

            if(membership == null)
            {
                membership = new Membership();
            }

            membership.MembershipOfferID = membershipOfferID;
            membership.UserID = userID;
            membership.Debt = 0;
            membership.Active = true;
            membership.JoinDate = DateTime.Now;
            membership.ExpirationDate = DateTime.Now.AddMonths(offer.AddedMonths);

            if(membership.ID != default)
            {
                _context.Membership.Update(membership);
            } else 
            {
                _context.Membership.Add(membership);
            }

            _context.SaveChanges();

            return membership;
        }

        public Membership Extend(int membershipOfferID, int membershipId)
        {
            var offer = _context.MembershipOffers.FirstOrDefault(mo => mo.ID == membershipOfferID);

            var membership = _context.Membership.Find(membershipId);

            if (membership == null)
            {
                return null;
            }

            membership.MembershipOfferID = membershipOfferID;
            membership.Active = true;
            membership.ExpirationDate = DateTime.Now.AddMonths(offer.AddedMonths);


            _context.Membership.Update(membership);
            _context.SaveChanges();

            return membership;
        }

        public List<Payment> GetPaymentsForMembership(int id)
        {
            return _context.Payment.Where(p => p.MembershipID == id).ToList();
        }
    }
}
