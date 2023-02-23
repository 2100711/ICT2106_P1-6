using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ICT2106P14.Migrations
{
    /// <inheritdoc />
    public partial class Building : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Room",
                columns: table => new
                {
                    roomID = table.Column<string>(type: "TEXT", nullable: false),
                    level = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Room", x => x.roomID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Room");
        }
    }
}
