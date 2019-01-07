using JetBrains.Annotations;
using ZwajApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ZwajApp.API.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}