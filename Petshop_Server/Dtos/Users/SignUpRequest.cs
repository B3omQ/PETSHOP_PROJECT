using System.ComponentModel.DataAnnotations;

namespace Petshop_Server.Dtos.Users
{
    public class SignUpRequest
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}