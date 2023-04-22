using Microsoft.EntityFrameworkCore.Migrations;

namespace eBibliotekaServer.Migrations
{
    public partial class AddImageLinkToAccount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "Accounts");

            migrationBuilder.AddColumn<int>(
                name: "ProfileImageID",
                table: "Accounts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_ProfileImageID",
                table: "Accounts",
                column: "ProfileImageID");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Images_ProfileImageID",
                table: "Accounts",
                column: "ProfileImageID",
                principalTable: "Images",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Images_ProfileImageID",
                table: "Accounts");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_ProfileImageID",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "ProfileImageID",
                table: "Accounts");

            migrationBuilder.AddColumn<string>(
                name: "ProfilePicture",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
