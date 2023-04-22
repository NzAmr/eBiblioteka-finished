using AutoMapper;
using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.BookModule.ViewModels;
using System;

namespace eBibliotekaServer.BookModule
{
    public class BookMapperProfile: Profile
    {
        public BookMapperProfile()
        {
            CreateMap<Author, AuthorListVM>();
            CreateMap<Book, BookAddVM>()
                .ForMember(VM => VM.AuthorID, o => o.MapFrom(l => l.Author.ID));
            CreateMap<Book, BookSearchVM>()
                .ForMember(VM=>VM.Author, o => o.MapFrom(b=>b.Author.Name))
                .ForMember(VM=>VM.CoverImage, o => o.MapFrom(b=>b.CoverImage.Path));
            CreateMap<Book, BookUpdateVM>();
            CreateMap<Book, BookDetailsVM>();
            CreateMap<LentBook, LentBookListVM>()
                .ForMember(VM => VM.Id, o => o.MapFrom(b => b.LentBookID))
                .ForMember(VM => VM.Returned, o => o.MapFrom(b => b.ReturnTime != default(DateTime)));
            CreateMap<BookTag, TagAddVM>()
                .ForMember(VM => VM.BookID, o => o.MapFrom(t => t.BookID));
            CreateMap<BookTag, TagGetVM>();
            CreateMap<LentBook, LentBookDetailedListVM>()
                .ForMember(VM => VM.ID, o => o.MapFrom(b => b.LentBookID))
                .ForMember(VM => VM.Returned, o => o.MapFrom(b => b.ReturnTime != default(DateTime)));
            CreateMap<LentBook, UserLentBookVM>()
                .ForMember(VM => VM.BookID, o => o.MapFrom(b => b.Book.ID))
                .ForMember(VM => VM.Title, o => o.MapFrom(b => b.Book.Title))
                .ForMember(VM => VM.Author, o => o.MapFrom(b => b.Book.Author.Name))
                .ForMember(VM => VM.LibraryName, o => o.MapFrom(b => b.Book.Author.Library.Name))
                .ForMember(VM => VM.CoverImage, o => o.MapFrom(b => b.Book.CoverImage.Path));
            CreateMap<Series, SeriesListItemVM>();
            CreateMap<LentBook, LentBookAvailabilityVM>();
        }
    }
}
