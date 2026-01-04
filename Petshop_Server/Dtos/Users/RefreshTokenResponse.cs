using Petshop_Server.Models;

namespace Petshop_Server.Dtos.Users
{
    public class RefreshTokenResponse
    {
        public int UserId { get; set; }
        public string Email { get; set; }

        public string? Role { get; set; }

        public string AccessToken { get; set; }
        public DateTime AccessTokenExpires { get; set; }

        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpires { get; set; }

        public UserResponse UserResponse { get; set; }
    }
}
