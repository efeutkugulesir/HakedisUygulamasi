using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddKullaniciRolsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KullaniciRol_Kullanicis_KullaniciId",
                table: "KullaniciRol");

            migrationBuilder.DropForeignKey(
                name: "FK_KullaniciRol_Roles_RolId",
                table: "KullaniciRol");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KullaniciRol",
                table: "KullaniciRol");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Kullanicis");

            migrationBuilder.RenameTable(
                name: "KullaniciRol",
                newName: "KullaniciRols");

            migrationBuilder.RenameIndex(
                name: "IX_KullaniciRol_RolId",
                table: "KullaniciRols",
                newName: "IX_KullaniciRols_RolId");

            migrationBuilder.RenameIndex(
                name: "IX_KullaniciRol_KullaniciId",
                table: "KullaniciRols",
                newName: "IX_KullaniciRols_KullaniciId");

            migrationBuilder.AlterColumn<string>(
                name: "Guncelleyen",
                table: "Roles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KullaniciRols",
                table: "KullaniciRols",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KullaniciRols_Kullanicis_KullaniciId",
                table: "KullaniciRols",
                column: "KullaniciId",
                principalTable: "Kullanicis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KullaniciRols_Roles_RolId",
                table: "KullaniciRols",
                column: "RolId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KullaniciRols_Kullanicis_KullaniciId",
                table: "KullaniciRols");

            migrationBuilder.DropForeignKey(
                name: "FK_KullaniciRols_Roles_RolId",
                table: "KullaniciRols");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KullaniciRols",
                table: "KullaniciRols");

            migrationBuilder.RenameTable(
                name: "KullaniciRols",
                newName: "KullaniciRol");

            migrationBuilder.RenameIndex(
                name: "IX_KullaniciRols_RolId",
                table: "KullaniciRol",
                newName: "IX_KullaniciRol_RolId");

            migrationBuilder.RenameIndex(
                name: "IX_KullaniciRols_KullaniciId",
                table: "KullaniciRol",
                newName: "IX_KullaniciRol_KullaniciId");

            migrationBuilder.AlterColumn<string>(
                name: "Guncelleyen",
                table: "Roles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Kullanicis",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KullaniciRol",
                table: "KullaniciRol",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KullaniciRol_Kullanicis_KullaniciId",
                table: "KullaniciRol",
                column: "KullaniciId",
                principalTable: "Kullanicis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KullaniciRol_Roles_RolId",
                table: "KullaniciRol",
                column: "RolId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
