using Microsoft.EntityFrameworkCore.Migrations;

namespace eBibliotekaServer.Migrations
{
    public partial class LibraryAbout : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AboutLong",
                table: "Libraries");

            migrationBuilder.RenameColumn(
                name: "AboutShort",
                table: "Libraries",
                newName: "About");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "About",
                table: "Libraries",
                newName: "AboutShort");

            migrationBuilder.AddColumn<string>(
                name: "AboutLong",
                table: "Libraries",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
