using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ZwajApp.API.DTOs;
using ZwajApp.API.Models;
using ZwajApp.API.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;

namespace ZwajApp.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repo;
        private readonly IConfiguration config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            this.repo = repo;
            this.config = config;
           _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegister)
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


        [HttpPost("login")]
        public async Task<IActionResult> login(UserForLoginDto userForLogin)
        {
            var userFromRepo = await repo.Login(userForLogin.UserName.ToLower(), userForLogin.Password);
            if (userFromRepo == null) { return Unauthorized(); }
            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier , userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name , userFromRepo.UserName)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user = _mapper.Map<UserForListDto>(userFromRepo);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }

    }
}