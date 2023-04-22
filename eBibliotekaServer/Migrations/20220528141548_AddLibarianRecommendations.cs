using Microsoft.EntityFrameworkCore.Migrations;

namespace eBibliotekaServer.Migrations
{
    public partial class AddLibarianRecommendations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LibrarianRecommendationsID",
                table: "Libraries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Libraries_LibrarianRecommendationsID",
                table: "Libraries",
                column: "LibrarianRecommendationsID");

            migrationBuilder.AddForeignKey(
                name: "FK_Libraries_Series_LibrarianRecommendationsID",
                table: "Libraries",
                column: "LibrarianRecommendationsID",
                principalTable: "Series",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Libraries_Series_LibrarianRecommendationsID",
                table: "Libraries");

            migrationBuilder.DropIndex(
                name: "IX_Libraries_LibrarianRecommendationsID",
                table: "Libraries");

            migrationBuilder.DropColumn(
                name: "LibrarianRecommendationsID",
                table: "Libraries");
        }
    }
}
