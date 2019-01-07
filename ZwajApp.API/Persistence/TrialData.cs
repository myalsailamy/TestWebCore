using System.Collections.Generic;
using Newtonsoft.Json;
using ZwajApp.API.Models;

namespace ZwajApp.API.Persistence
{
    public class TrialData
    {
        public DataContext context { get; }
        public TrialData(DataContext context)
        {
            this.context = context;
        }

        public void TrialUsers()
        {
            var userData = System.IO.File.ReadAllText("Persistence/UsersTrialData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.UserName = user.UserName.ToLower();
                this.context.Add(user);
            }
            this.context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}