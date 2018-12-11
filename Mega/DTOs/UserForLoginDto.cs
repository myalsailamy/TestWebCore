using System.ComponentModel.DataAnnotations;

namespace Mega.DTOs
{
    public class UserForLoginDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Your password should Length between 4-8 characters.")]
        public string Password { get; set; }
    }
}