using Petshop_Server.Models;

namespace Petshop_Server.Services.RefreshTokens
{
    public interface IRefreshTokenService
    {
        Task RemoveTokenExpireByUserId(int userId);
        Task AddRefreshToken(RefreshToken refreshToken);
        Task UpdateRefreshToken(RefreshToken refreshToken);
        Task<RefreshToken?> GetRefreshTokenByRefreshToken(string refreshToken);
    }
}
