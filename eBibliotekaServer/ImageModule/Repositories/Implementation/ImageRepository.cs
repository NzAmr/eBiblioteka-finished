using eBibliotekaServer.Data;
using eBibliotekaServer.ImageModule.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;

namespace eBibliotekaServer.ImageModule.Repositories.Implementation
{
    public class ImageRepository : IImageRepository
    {
        private readonly AppDbContext _context;

        public ImageRepository(AppDbContext context)
        {
            _context = context;
        }

        public Image AddImage(IFormFile file, string imageType, string library)
        {
            var folderName = Path.Combine("Static", "Images", imageType, library);
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            Directory.CreateDirectory(pathToSave);

            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                var image = new Image() { Path = dbPath, CreatedAt = DateTime.Now };

                _context.Images.Add(image);
                _context.SaveChanges();

                return image;
            }
            else
            {
                throw new InvalidDataException();
            }
        }

        public bool RemoveImage(int id)
        {
            try
            {
                var image = _context.Images.FirstOrDefault(i => i.ID == id);

                var pathToImage = Path.Combine(Directory.GetCurrentDirectory(), image.Path);
                File.Delete(pathToImage);

                _context.Remove(image);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }
            
            return true;
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
