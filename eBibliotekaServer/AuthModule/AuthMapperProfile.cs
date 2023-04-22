using AutoMapper;
using eBibliotekaServer.AuthModule.Models;
using eBibliotekaServer.AuthModule.ViewModels;

namespace eBibliotekaServer.AuthModule
{
    public class AuthMapperProfile : Profile
    {
        public AuthMapperProfile()
        {
            CreateMap<User, AccountGetVM>();
            CreateMap<User, AccountDetailsVM>()
                .ForMember(VM => VM.ProfilePicture, o => o.MapFrom(l => l.ProfileImage));

            CreateMap<Librarian, AccountGetVM>();
            CreateMap<Librarian, AccountDetailsVM>()
                .ForMember(VM => VM.ProfilePicture, o => o.MapFrom(l => l.ProfileImage));
        }
    }
}
