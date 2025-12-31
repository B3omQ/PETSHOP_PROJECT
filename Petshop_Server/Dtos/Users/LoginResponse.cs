namespace Petshop_Server.Dtos.Users
{
    public class LoginResponse
    {
        public int UserId { get; set; }
        public string Email { get; set; }

        public string? Role { get; set; }
    }
}
