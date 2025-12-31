using System.ComponentModel.DataAnnotations;

namespace Petshop_Server.Dtos.Users
{
    public class LoginRequest
    {
        [Required]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
