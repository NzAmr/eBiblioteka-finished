﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using eBibliotekaServer.Data;

namespace eBibliotekaServer.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220420194349_AddMembershipJoinDate")]
    partial class AddMembershipJoinDate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.13")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("eBibliotekaServer.AuthModule.Models.Account", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Password")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int?>("ProfileImageID")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("ProfileImageID");

                    b.ToTable("Accounts");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Account");
                });

            modelBuilder.Entity("eBibliotekaServer.BookModule.Models.Author", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LibraryID")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("LibraryID");

                    b.ToTable("Authors");
                });

            modelBuilder.Entity("eBibliotekaServer.BookModule.Models.Book", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AuthorID")
                        .HasColumnType("int");

                    b.Property<int?>("CoverImageID")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfCopies")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("AuthorID");

                    b.HasIndex("CoverImageID");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("eBibliotekaServer.BookModule.Models.LentBook", b =>
                {
                    b.Property<int>("LentBookID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookID")
                        .HasColumnType("int");

                    b.Property<DateTime>("LentAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("MembershipID")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReturnDeadline")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ReturnTime")
                        .HasColumnType("datetime2");

                    b.HasKey("LentBookID");

                    b.HasIndex("BookID");

                    b.HasIndex("MembershipID");

                    b.ToTable("LentBooks");
                });

            modelBuilder.Entity("eBibliotekaServer.ImageModule.Models.Image", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Path")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("eBibliotekaServer.LibraryModule.Models.BusinessHours", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LibraryID")
                        .HasColumnType("int");

                    b.Property<string>("TimeFrom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TimeTo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("WorkingDay")
                        .HasColumnType("bit");

                    b.HasKey("ID");

                    b.HasIndex("LibraryID");

                    b.ToTable("BusinessHours");
                });

            modelBuilder.Entity("eBibliotekaServer.LibraryModule.Models.Library", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("About")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("BannerImageID")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProfileImageID")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("BannerImageID");

                    b.HasIndex("ProfileImageID");

                    b.ToTable("Libraries");
                });

            modelBuilder.Entity("eBibliotekaServer.LibraryModule.Models.MembershipOffer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<int>("AddedMonths")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LibraryID")
                        .HasColumnType("int");

                    b.Property<int>("NoOfBooks")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("LibraryID");

                    b.ToTable("MembershipOffers");
                });

            modelBuilder.Entity("eBibliotekaServer.MembershipModule.Models.Membership", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<decimal>("Debt")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("ExpirationDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("JoinDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("MembershipOfferID")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("MembershipOfferID");

                    b.HasIndex("UserID");

                    b.ToTable("Membership");
                });

            modelBuilder.Entity("eBibliotekaServer.MembershipModule.Models.Payment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Amount")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("MembershipID")
                        .HasColumnType("int");

                    b.Property<string>("PaymentMethod")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Reason")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimeOfPayment")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("MembershipID");

                    b.ToTable("Payment");
                });

            modelBuilder.Entity("eBibliotekaServer.AuthModule.Models.Librarian", b =>
                {
                    b.HasBaseType("eBibliotekaServer.AuthModule.Models.Account");

                    b.Property<int>("LibraryID")
                        .HasColumnType("int");

                    b.HasIndex("LibraryID");

                    b.HasDiscriminator().HasValue("Librarian");
                });

            modelBuilder.Entity("eBibliotekaServer.AuthModule.Models.User", b =>
                {
                    b.HasBaseType("eBibliotekaServer.AuthModule.Models.Account");

                    b.HasDiscriminator().HasValue("User");
                });

            modelBuilder.Entity("eBibliotekaServer.AuthModule.Models.Account", b =>
                {
                    b.HasOne("eBibliotekaServer.ImageModule.Models.Image", "ProfileImage")
                        .WithMany()
                        .HasForeignKey("ProfileImageID");

                    b.Navigation("ProfileImage");
                });

            modelBuilder.Entity("eBibliotekaServer.BookModule.Models.Author", b =>
                {
                    b.HasOne("eBibliotekaServer.LibraryModule.Models.Library", "Library")
                        .WithMany()
                        .HasForeignKey("LibraryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Library");
                });

            modelBuilder.Entity("eBibliotekaServer.BookModule.Models.Book", b =>
                {
                    b.HasOne("eBibliotekaServer.BookModule.Models.Author", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorID");

                    b.HasOne("eBibliotekaServer.ImageModule.Models.Image", "CoverImage")
                        .WithMany()
                        .HasForeignKey("CoverImageID");

                    b.Navigation("Author");

                    b.Navigation("CoverImage");
                });

            modelBuilder.Entity("eBibliotekaServer.BookModule.Models.LentBook", b =>
                {
                    b.HasOne("eBibliotekaServer.BookModule.Models.Book", "Book")
                        .WithMany()
                        .HasForeignKey("BookID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("eBibliotekaServer.MembershipModule.Models.Membership", "Membership")
                        .WithMany()
                        .HasForeignKey("MembershipID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("Membership");
                });

            modelBuilder.Entity("eBibliotekaServer.LibraryModule.Models.BusinessHours", b =>
                {
                    b.HasOne("eBibliotekaServer.LibraryModule.Models.Library", "Library")
                        .WithMany()
                        .HasForeignKey("LibraryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Library");
                });

            modelBuilder.Entity("eBibliotekaServer.LibraryModule.Models.Library", b =>
                {
                    b.HasOne("eBibliotekaServer.ImageModule.Models.Image", "BannerImage")
                        .WithMany()
                        .HasForeignKey("BannerImageID");

                    b.HasOne("eBibliotekaServer.ImageModule.Models.Image", "ProfileImage")
                        .WithMany()
                        .HasForeignKey("ProfileImageID");

                    b.Navigation("BannerImage");

                    b.Navigation("ProfileImage");
                });

            modelBuilder.Entity("eBibliotekaServer.LibraryModule.Models.MembershipOffer", b =>
                {
                    b.HasOne("eBibliotekaServer.LibraryModule.Models.Library", "Library")
                        .WithMany()
                        .HasForeignKey("LibraryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Library");
                });

            modelBuilder.Entity("eBibliotekaServer.MembershipModule.Models.Membership", b =>
                {
                    b.HasOne("eBibliotekaServer.LibraryModule.Models.MembershipOffer", "MembershipOffer")
                        .WithMany()
                        .HasForeignKey("MembershipOfferID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("eBibliotekaServer.AuthModule.Models.User", "User")
                        .WithMany("Memberships")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MembershipOffer");

                    b.Navigation("User");
                });

            modelBuilder.Entity("eBibliotekaServer.MembershipModule.Models.Payment", b =>
                {
                    b.HasOne("eBibliotekaServer.MembershipModule.Models.Membership", "Membership")
                        .WithMany()
                        .HasForeignKey("MembershipID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Membership");
                });

            modelBuilder.Entity("eBibliotekaServer.AuthModule.Models.Librarian", b =>
                {
                    b.HasOne("eBibliotekaServer.LibraryModule.Models.Library", "Library")
                        .WithMany()
                        .HasForeignKey("LibraryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Library");
                });

            modelBuilder.Entity("eBibliotekaServer.AuthModule.Models.User", b =>
                {
                    b.Navigation("Memberships");
                });
#pragma warning restore 612, 618
        }
    }
}
