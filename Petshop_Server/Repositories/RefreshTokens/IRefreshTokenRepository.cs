using Petshop_Server.Models;

namespace Petshop_Server.Repositories.RefreshTokens
{
    public interface IRefreshTokenRepository
    {
        Task RemoveRefreshTokensExpiredByUserId(int userId);

        Task AddRefreshToken(RefreshToken refreshToken);

        Task<RefreshToken?> GetRefreshTokenByRefreshToken(string refreshtoken);

        Task UpdateRefreshToken(RefreshToken refreshToken);
    }
}
