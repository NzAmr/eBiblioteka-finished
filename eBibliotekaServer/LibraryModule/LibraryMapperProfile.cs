using AutoMapper;
using eBibliotekaServer.LibraryModule.Models;
using eBibliotekaServer.LibraryModule.ViewModels;

namespace eBibliotekaServer.LibraryModule
{
    public class LibraryMapperProfile : Profile
    {
        public LibraryMapperProfile()
        {
            CreateMap<Library, LibraryListVM>()
                .ForMember(VM => VM.BannerImage, o => o.MapFrom(l => l.BannerImage.Path))
                .ForMember(VM => VM.ProfileImage, o => o.MapFrom(l => l.ProfileImage.Path));
            CreateMap<Library, UserLibrariesVM>()
                .ForMember(VM => VM.BannerImage, o => o.MapFrom(l => l.BannerImage.Path))
                .ForMember(VM => VM.ProfileImage, o => o.MapFrom(l => l.ProfileImage.Path));
            CreateMap<Library, LibraryDetailsVM>();
            CreateMap<MembershipOffer, MembershipOfferGetVM>();
            CreateMap<MembershipOfferUpdateVM, MembershipOffer>();
            CreateMap<MembershipOfferCreateVM, MembershipOffer>();
            CreateMap<BusinessHours, BusinessHoursGetVM>();

            CreateMap<Library, LibraryMapSearch>()
                .ForMember(VM => VM.Description, o => o.MapFrom(l => l.Location.Description))
                .ForMember(VM => VM.Latitude, o => o.MapFrom(l => l.Location.Latitude))
                .ForMember(VM => VM.Longitude, o => o.MapFrom(l => l.Location.Longitude))
                .ForMember(VM => VM.Zoom, o => o.MapFrom(l => l.Location.Zoom));

            CreateMap<Notification, NotificationListItemVM>()
                .ForMember(n => n.Sender, o => o.MapFrom(n => n.Sender));
        }
    }
}
