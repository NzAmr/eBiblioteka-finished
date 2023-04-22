using Microsoft.EntityFrameworkCore.Migrations;

namespace eBibliotekaServer.Migrations
{
    public partial class AddConnectionLibraryImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BannerImage",
                table: "Libraries");

            migrationBuilder.DropColumn(
                name: "ProfileImage",
                table: "Libraries");

            migrationBuilder.AddColumn<int>(
                name: "BannerImageID",
                table: "Libraries",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProfileImageID",
                table: "Libraries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Libraries_BannerImageID",
                table: "Libraries",
                column: "BannerImageID");

            migrationBuilder.CreateIndex(
                name: "IX_Libraries_ProfileImageID",
                table: "Libraries",
                column: "ProfileImageID");

            migrationBuilder.AddForeignKey(
                name: "FK_Libraries_Images_BannerImageID",
                table: "Libraries",
                column: "BannerImageID",
                principalTable: "Images",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Libraries_Images_ProfileImageID",
                table: "Libraries",
                column: "ProfileImageID",
                principalTable: "Images",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Libraries_Images_BannerImageID",
                table: "Libraries");

            migrationBuilder.DropForeignKey(
                name: "FK_Libraries_Images_ProfileImageID",
                table: "Libraries");

            migrationBuilder.DropIndex(
                name: "IX_Libraries_BannerImageID",
                table: "Libraries");

            migrationBuilder.DropIndex(
                name: "IX_Libraries_ProfileImageID",
                table: "Libraries");

            migrationBuilder.DropColumn(
                name: "BannerImageID",
                table: "Libraries");

            migrationBuilder.DropColumn(
                name: "ProfileImageID",
                table: "Libraries");

            migrationBuilder.AddColumn<string>(
                name: "BannerImage",
                table: "Libraries",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfileImage",
                table: "Libraries",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
