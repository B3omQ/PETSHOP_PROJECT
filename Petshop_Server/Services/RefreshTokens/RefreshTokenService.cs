using Azure;
using Petshop_Server.Models;
using Petshop_Server.Repositories.RefreshTokens;

namespace Petshop_Server.Services.RefreshTokens
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IRefreshTokenRepository _refreshTokensRepository;

        public RefreshTokenService(IRefreshTokenRepository refreshTokenRepository)
        {
            _refreshTokensRepository = refreshTokenRepository;
        }

        public async Task AddRefreshToken(RefreshToken refreshToken)
        {
            await _refreshTokensRepository.AddRefreshToken(refreshToken); 
        }

        public async Task<RefreshToken?> GetRefreshTokenByRefreshToken(string refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                return null;
            }
            var response = await _refreshTokensRepository.GetRefreshTokenByRefreshToken(refreshToken);
            if(response == null)
            {
                return null;
            }
            return response;
        }

        public async Task UpdateRefreshToken(RefreshToken refreshToken)
        {
            refreshToken.Revoked = DateTime.UtcNow;
            await _refreshTokensRepository.UpdateRefreshToken(refreshToken);
        }

        public async Task RemoveTokenExpireByUserId(int userId)
        {
           await _refreshTokensRepository.RemoveRefreshTokensExpiredByUserId(userId);
        }
    }
}
