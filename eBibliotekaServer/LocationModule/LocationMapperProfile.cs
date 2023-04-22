using AutoMapper;
using eBibliotekaServer.LibraryModule.Models;
using eBibliotekaServer.LibraryModule.ViewModels;
using eBibliotekaServer.LocationModule.Models;
using eBibliotekaServer.LocationModule.ViewModels;

namespace eBibliotekaServer.LocationModule
{
    public class LocationMapperProfile : Profile
    {
        public LocationMapperProfile()
        {
            CreateMap<Location, LocationVM>();
        }
    }
}
