using AutoMapper;
using eBibliotekaServer.MembershipModule.Models;
using eBibliotekaServer.MembershipModule.ViewModels;

namespace eBibliotekaServer.MembershipModule
{
    public class MembershipMapperProfile : Profile
    {
        public MembershipMapperProfile()
        {
            CreateMap<Membership, MemberListVM>()
                .ForMember(VM => VM.ProfileImage, o => o.MapFrom(l => l.User.ProfileImage.Path))
                .ForMember(VM => VM.FirstName, o => o.MapFrom(l => l.User.FirstName))
                .ForMember(VM => VM.LastName, o => o.MapFrom(l => l.User.LastName))
                .ForMember(VM => VM.Username, o => o.MapFrom(l => l.User.Username))
                .ForMember(VM => VM.UserID, o=>o.MapFrom(l => l.User.ID))
                .ForMember(VM => VM.Email, o => o.MapFrom(l => l.User.Email));

            CreateMap<Membership, MemberDetailsVM>()
                .ForMember(VM => VM.ProfileImage, o => o.MapFrom(l => l.User.ProfileImage.Path))
                .ForMember(VM => VM.FirstName, o => o.MapFrom(l => l.User.FirstName))
                .ForMember(VM => VM.LastName, o => o.MapFrom(l => l.User.LastName))
                .ForMember(VM => VM.Username, o => o.MapFrom(l => l.User.Username))
                .ForMember(VM => VM.Email, o => o.MapFrom(l => l.User.Email));

            CreateMap<Payment, PaymentListVM>();
        }
    }
}
