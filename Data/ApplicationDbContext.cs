using Microsoft.EntityFrameworkCore;
using WorkersManagementApi.Models;

namespace WorkersManagementApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
 {
    }

    public DbSet<Worker> Trabajadores { get; set; } = null!;
}