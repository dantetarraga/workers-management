using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkersManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class AddStoredPRocedures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var basePath = Path.Combine(Directory.GetCurrentDirectory(), "scripts");

            var scripts = new List<string>
            {
                "sp_CreateWorker.sql",
                "sp_UpdateWorker.sql",
                "sp_DeleteWorker.sql",
                "sp_GetWorkers.sql",
                "sp_GetWorkerById.sql"
            };

            foreach (var script in scripts)
            {
                var scriptPath = Path.Combine(basePath, script);
                var sql = File.ReadAllText(scriptPath);
                migrationBuilder.Sql(sql);
            }
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var procedures = new List<string>
            {
                "sp_CreateWorker",
                "sp_UpdateWorker",
                "sp_DeleteWorker",
                "sp_GetWorkers",
                "sp_GetWorkerById"
            };

            foreach (var procedure in procedures)
            {
                migrationBuilder.Sql($"DROP PROCEDURE IF EXISTS {procedure}");
            }
        }
    }
}
