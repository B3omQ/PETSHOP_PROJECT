using System.ComponentModel.DataAnnotations;

namespace Petshop_Server.Dtos.Users
{
    public class SignUpRequest
    {
        [Required(ErrorMessage = "Full name is required")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm password is required")]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [RegularExpression(@"^(0|\+84)[0-9]{9,10}$", ErrorMessage = "Invalid phone number")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [MinLength(5, ErrorMessage = "Address must be at least 5 characters")]
        public string Address { get; set; }

    }
}