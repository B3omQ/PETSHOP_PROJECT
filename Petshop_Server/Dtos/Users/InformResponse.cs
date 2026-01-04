namespace Petshop_Server.Dtos.Users
{
    public class InformResponse
    {
        public bool Success { get; set; }
        public Dictionary<string , string> Errors { get; set; } = new Dictionary<string , string>();

        public string? Message { get; set; }
    }
}
