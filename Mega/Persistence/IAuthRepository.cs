using System.Threading.Tasks;
using Mega.Models;

namespace Mega.Persistence
{
    public interface IAuthRepository
    {
         Task<User> Register(User user , string password);
         Task<User> Login(string userName , string password);
         Task<bool> UserExists(string userName);
    }
}