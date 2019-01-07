using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ZwajApp.API.Models;

namespace ZwajApp.API.Persistence
{
    public class ZwajRepository : IZwajRepository
    {
        public DataContext Context { get; }

        public ZwajRepository(DataContext context)
        {
            this.Context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            this.Context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            this.Context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await this.Context.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await this.Context.Users.Include(u => u.Photos).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await this.Context.SaveChangesAsync() > 0 ;
        }
    }
} 