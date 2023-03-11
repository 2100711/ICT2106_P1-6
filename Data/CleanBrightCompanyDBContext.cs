using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CleanBrightCompany.Models;

namespace CleanBrightCompany.Data;

public class CleanBrightCompanyDBContext : DbContext
{
    public DbSet<CleanBrightCompany.Models.Product> Product { get; set; } = default!;
    public DbSet<CleanBrightCompany.Models.Room> Room { get; set; } = default!;
    public DbSet<CleanBrightCompany.Models.RoomUsage> RoomUsage { get; set; } = default!;
    public DbSet<CleanBrightCompany.Models.Reward> Reward { get; set; } = default!;

    public CleanBrightCompanyDBContext()
    {

    }

    public CleanBrightCompanyDBContext(DbContextOptions<CleanBrightCompanyDBContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
modelBuilder.ApplyConfigurationsFromAssembly(typeof(CleanBrightCompanyDBContext).Assembly);
    }
}
