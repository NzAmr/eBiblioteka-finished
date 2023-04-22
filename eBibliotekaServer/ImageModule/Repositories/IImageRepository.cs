using eBibliotekaServer.ImageModule.Models;
using Microsoft.AspNetCore.Http;

namespace eBibliotekaServer.ImageModule.Repositories
{
    public interface IImageRepository
    {
        public Image AddImage(IFormFile image, string imageType, string library);
        public bool RemoveImage(int id);

        public bool SaveChanges();
    }
}
