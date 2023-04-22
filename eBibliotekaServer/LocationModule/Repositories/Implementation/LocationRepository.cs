using eBibliotekaServer.Data;
using eBibliotekaServer.LocationModule.Models;
using eBibliotekaServer.LocationModule.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace eBibliotekaServer.LocationModule.Repositories.Implementation
{
    public class LocationRepository : ILocationRepository
    {
        private readonly AppDbContext _context;

        public LocationRepository(AppDbContext context)
        {
            _context = context;
        }

        public Location AddLocationToLibrary(int libraryId, LocationVM data)
        {
            var library = _context.Libraries.Find(libraryId);

            if(library == null) return null;

            Location item;

            if(library.LocationID == null || library.LocationID == default(int))
            {
                item = new Location()
                {
                    Description = data.Description,
                    Latitude = data.Latitude,
                    Longitude = data.Longitude,
                    Zoom = data.Zoom,
                };

                _context.Add(item);
                _context.SaveChanges();

                library.LocationID = item.ID;
            }
            else
            {
                item = _context.Locations.Find(library.LocationID);

                item.Description = data.Description;
                item.Latitude = data.Latitude;
                item.Longitude = data.Longitude;
                item.Zoom = data.Zoom;
            }

            _context.SaveChanges();

            return item;
        }

        public Location GetLocationForLibrary(int libraryId)
        {
            return _context.Libraries
                .Include(l => l.Location)
                .Where(l => l.ID == libraryId).FirstOrDefault()?.Location;
        }

        public Location RemoveLocationForLibrary(int libraryId)
        {
            var item = _context.Libraries.Include(l => l.Location).Where(l => l.ID == libraryId).FirstOrDefault();

            if(item == null) return null;

            if (item.LocationID == null)
            {
                return null;
            }

            var locationID = item.LocationID;

            item.LocationID = null;
            _context.SaveChanges();

            _context.Locations.Remove(_context.Locations.Find(locationID));
            _context.SaveChanges();

            return item.Location;
        }

        public Location UpdateLocation(int locationId, LocationVM data)
        {
            var item = _context.Locations.Find(locationId);

            item.Description = data.Description;
            item.Latitude = data.Latitude;
            item.Longitude = data.Longitude;
            item.Zoom = data.Zoom;

            _context.Add(item);
            _context.SaveChanges();

            return item;
        }
    }
}
