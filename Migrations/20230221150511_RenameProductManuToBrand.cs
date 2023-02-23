using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ICT2106P14.Migrations
{
    /// <inheritdoc />
    public partial class RenameProductManuToBrand : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Manufacturer",
                table: "Product",
                newName: "Brand");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Brand",
                table: "Product",
                newName: "Manufacturer");
        }
    }
}
