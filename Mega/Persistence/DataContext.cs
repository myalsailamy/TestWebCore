using JetBrains.Annotations;
using Mega.Models;
using Microsoft.EntityFrameworkCore;

namespace Mega.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }

    }
}