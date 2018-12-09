using JetBrains.Annotations;
using mega.Models;
using Microsoft.EntityFrameworkCore;

namespace mega.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; }

    }
}