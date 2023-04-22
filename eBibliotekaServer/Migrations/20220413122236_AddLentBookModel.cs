using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eBibliotekaServer.Migrations
{
    public partial class AddLentBookModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LentBooks",
                columns: table => new
                {
                    LentBookID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LentAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnDeadline = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BookID = table.Column<int>(type: "int", nullable: false),
                    MembershipID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LentBooks", x => x.LentBookID);
                    table.ForeignKey(
                        name: "FK_LentBooks_Books_BookID",
                        column: x => x.BookID,
                        principalTable: "Books",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_LentBooks_Membership_MembershipID",
                        column: x => x.MembershipID,
                        principalTable: "Membership",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_LentBooks_BookID",
                table: "LentBooks",
                column: "BookID");

            migrationBuilder.CreateIndex(
                name: "IX_LentBooks_MembershipID",
                table: "LentBooks",
                column: "MembershipID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LentBooks");
        }
    }
}
