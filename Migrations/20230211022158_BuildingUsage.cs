using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ICT2106P14.Migrations
{
    /// <inheritdoc />
    public partial class BuildingUsage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoomUsage",
                columns: table => new
                {
                    roomUsageID = table.Column<string>(type: "TEXT", nullable: false),
                    electricityUsage = table.Column<float>(type: "REAL", nullable: false),
                    logDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    carbonFootprintEmission = table.Column<float>(type: "REAL", nullable: false),
                    roomID = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomUsage", x => x.roomUsageID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomUsage");
        }
    }
}
