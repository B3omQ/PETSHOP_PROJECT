namespace Petshop_Server.Dtos.Users
{
    public class SignUpResponse
    {
        public bool Success { get; set; }
        public Dictionary<string , string> Errors { get; set; } = new Dictionary<string , string>();
    }
}
