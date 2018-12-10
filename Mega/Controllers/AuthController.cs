using System.Threading.Tasks;
using Mega.DTOs;
using Mega.Models;
using Mega.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Mega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repo;
        public AuthController(IAuthRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register( UserForRegisterDto userForRegister)
        {
            userForRegister.Username = userForRegister.Username.ToLower();
            if (await repo.UserExists(userForRegister.Username))
            { return BadRequest("this username was Tokken, choose another username."); }
            var userToCreate = new User
            {
                UserName = userForRegister.Username
            };
            var createdUser = await repo.Register(userToCreate, userForRegister.Password);
            return StatusCode(201);
        }

    }
}