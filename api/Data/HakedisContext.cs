using Microsoft.EntityFrameworkCore;
using HakedisAPI.Models;

namespace HakedisAPI.Data
{
    public class HakedisContext : DbContext
    {
        public HakedisContext(DbContextOptions<HakedisContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hakedis>(entity =>
        {
            entity.ToTable("Hakedis");
        });
        
        modelBuilder.Entity<Company>(entity =>
        {
            entity.ToTable("Companies");
        });
        base.OnModelCreating(modelBuilder);
        // Configure the relationship between Hakedis and Company
        
    }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Hakedis> Hakedis { get; set; }
        public DbSet<Kullanici> Kullanicis { get; set; } 
        public DbSet<Rol> Roles { get; set; }
        public DbSet<KullaniciRol> KullaniciRols { get; set; }

    }
}
