namespace Petshop_Server.Services.RefreshTokens
{
    public interface ITokenBlackListService
    {
        Task BlacklistTokenAsync(string token, DateTime expirationTime);
        Task<bool> IsTokenBlacklistedAsync(string token);
    }
}
