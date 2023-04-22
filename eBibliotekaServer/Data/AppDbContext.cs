using eBibliotekaServer.AuthModule.Models;
using eBibliotekaServer.BookModule.Models;
using eBibliotekaServer.ImageModule.Models;
using eBibliotekaServer.LibraryModule.Models;
using eBibliotekaServer.LocationModule.Models;
using eBibliotekaServer.MembershipModule.Models;
using Microsoft.EntityFrameworkCore;

namespace eBibliotekaServer.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
        {

        }

        public DbSet<Image> Images { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Librarian> Librarians { get; set; }
        public DbSet<Library> Libraries { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<MembershipOffer> MembershipOffers { get; set; }
        public DbSet<BusinessHours> BusinessHours { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Membership> Membership { get; set; }
        public DbSet<Payment> Payment { get; set; }
        public DbSet<LentBook> LentBooks { get; set; }
        public DbSet<BookTag> BookTags { get; set; }
        public DbSet<Series> Series { get; set; }
        public DbSet<BookSeries> BookSeries { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Notification> Notifications { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MembershipOffer>().Property(mo => mo.Price).HasPrecision(18, 2);
            modelBuilder.Entity<Membership>().Property(m => m.Debt).HasPrecision(18, 2);
            modelBuilder.Entity<Payment>().Property(p => p.Amount).HasPrecision(18, 2);

            modelBuilder.Entity<Membership>()
                .HasOne(m => m.User)
                .WithMany(u => u.Memberships)
                .HasForeignKey(m => m.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Membership>()
                .HasOne(m => m.MembershipOffer)
                .WithMany()
                .HasForeignKey(m => m.MembershipOfferID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LentBook>()
                .HasOne(lb => lb.Book)
                .WithMany()
                .HasForeignKey(m => m.BookID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<LentBook>()
                .HasOne(lb => lb.Membership)
                .WithMany()
                .HasForeignKey(lb => lb.MembershipID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<BookSeries>().HasKey(bs => new { bs.BookID, bs.SeriesID });

            base.OnModelCreating(modelBuilder);
        }
    }
}
