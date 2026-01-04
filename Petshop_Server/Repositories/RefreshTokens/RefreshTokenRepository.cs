
using Microsoft.EntityFrameworkCore;
using Petshop_Server.Models;

namespace Petshop_Server.Repositories.RefreshTokens
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly PetShopContext _context;

        public RefreshTokenRepository(PetShopContext context)
        {
            _context = context;
        }

        public async Task AddRefreshToken(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();
        }

        public async Task<RefreshToken?> GetRefreshTokenByRefreshToken(string refreshtoken)
        {
            return await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == refreshtoken);
        }

        public async Task RemoveRefreshTokensExpiredByUserId(int userId)
        {
            await _context.RefreshTokens.Where(t => t.UserId == userId
            && (t.Revoked != null || t.Expires < DateTime.UtcNow)).ExecuteDeleteAsync();
        }

        public async Task UpdateRefreshToken(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Update(refreshToken);
            await _context.SaveChangesAsync();
        }
    }
}
