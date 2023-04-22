using AutoMapper;
using eBibliotekaServer.AuthModule.Repositories;
using eBibliotekaServer.BookModule.Repositories;
using eBibliotekaServer.BookModule.ViewModels;
using eBibliotekaServer.Helpers;
using eBibliotekaServer.LibraryModule.Repositories;
using eBibliotekaServer.LibraryModule.ViewModels;
using eBibliotekaServer.MembershipModule.Models;
using eBibliotekaServer.MembershipModule.Repositories;
using eBibliotekaServer.MembershipModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace eBibliotekaServer.MembershipModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipController : ControllerBase
    {
        private readonly IMembershipRepository _membershipRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly IAuthRepository _authRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public MembershipController(IMembershipRepository membershipRepository, IAuthRepository authRepository, ILibraryRepository libraryRepository, IBookRepository bookRepository, IMapper mapper)
        {
            _membershipRepository = membershipRepository;
            _libraryRepository = libraryRepository;
            _authRepository = authRepository;
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        [Authorize(Roles = "User")]
        [HttpPost("{offerId}")]
        public ActionResult<Membership> CreateMembership(int offerId)
        {
            var userId = AuthHelper.GetAccountIdFromRequest(Request);

            var item = _membershipRepository.Subscribe(offerId, userId);

            var offer = _libraryRepository.GetMembershipOffer(offerId);

            var paymentData = new PaymentCreateVM()
            {
                Reason = "Uplata za članarinu",
                Amount = offer.Price,
                PaymentMethod = "Paypal",
                MembershipID = item.ID
            };

            var payment = _membershipRepository.AddPayment(paymentData);

            return Ok();
        }

        [Authorize(Roles = "Librarian")]
        [HttpPost()]
        public ActionResult<Membership> RegisterPayment(int offerId, int membershipId)
        {
            var item = _membershipRepository.Extend(offerId, membershipId);

            if(item == null)
            {
                return NotFound();
            }

            var offer = _libraryRepository.GetMembershipOffer(offerId);

            var paymentData = new PaymentCreateVM()
            {
                Reason = "Uplata za članarinu",
                Amount = offer.Price,
                PaymentMethod = "Gotovinski",
                MembershipID = item.ID
            };

            var payment = _membershipRepository.AddPayment(paymentData);

            return Ok(item);
        }

        [Authorize(Roles = "Librarian")]
        [HttpGet("search-members")]
        public ActionResult<PagedList<MemberListVM>> SearchMembersOfLibrary(string filter, int items_per_page, int page_number = 1)
        {
            var librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            var librarian = _authRepository.GetLibrarian(librarianId);

            var items = _membershipRepository.SearchMembershipsByLibrary(librarian.LibraryID, filter);

            var results = new List<MemberListVM>();

            foreach (var item in items)
            {
                results.Add(_mapper.Map<MemberListVM>(item));
            }

            return PagedList<MemberListVM>.Create(results.AsQueryable(), page_number, items_per_page);
        }

        [Authorize(Roles = "Librarian")]
        [HttpGet("search-members-list")]
        public ActionResult<PagedList<MemberListVM>> SearchMembersOfLibraryList(string filter)
        {
            var librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            var librarian = _authRepository.GetLibrarian(librarianId);

            var items = _membershipRepository.SearchMembershipsByLibrary(librarian.LibraryID, filter);

            return Ok(items);
        }
        [Authorize(Roles = "Librarian")]
        [HttpGet("details/{id}")]
        public ActionResult<MemberDetailsVM> GetMemberDetails(int id)
        {
            var librarianId = AuthHelper.GetAccountIdFromRequest(Request);

            var librarian = _authRepository.GetLibrarian(librarianId);

            var item = _membershipRepository.GetMembership(id);

            var results = _mapper.Map<MemberDetailsVM>(item);

            if (item == null || item.MembershipOffer.LibraryID != librarian.LibraryID)
            {
                return Unauthorized();
            }

            results.LentBooks = new List<LentBookDetailedListVM>();

            var lentBooks = _bookRepository.GetActiveLentBooksForMembership(id);

            foreach(var lentBook in lentBooks)
            {
                results.LentBooks.Add(_mapper.Map<LentBookDetailedListVM>(lentBook));
            }

            results.Payments = new List<PaymentListVM>();

            var payments = _membershipRepository.GetPaymentsForMembership(id);

            foreach (var payment in payments)
            {
                results.Payments.Add(_mapper.Map<PaymentListVM>(payment));
            }

            return results;
        }
    }
}
