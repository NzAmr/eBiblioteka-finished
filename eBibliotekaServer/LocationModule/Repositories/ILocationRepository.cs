using eBibliotekaServer.LocationModule.Models;
using eBibliotekaServer.LocationModule.ViewModels;

namespace eBibliotekaServer.LocationModule.Repositories
{
    public interface ILocationRepository
    {
        Location AddLocationToLibrary(int libraryId, LocationVM data);
        Location UpdateLocation(int locationId, LocationVM data);
        Location GetLocationForLibrary(int libraryId);
        Location RemoveLocationForLibrary(int libraryId);
    }
}
