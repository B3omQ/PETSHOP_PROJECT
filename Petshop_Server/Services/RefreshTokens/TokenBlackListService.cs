
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;

namespace Petshop_Server.Services.RefreshTokens
{
    public class TokenBlackListService : ITokenBlackListService
    {
        private readonly IMemoryCache _cache;

        public TokenBlackListService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public Task BlacklistTokenAsync(string token, DateTime expirationTime)
        {
            var timeToLive = expirationTime - DateTime.UtcNow;

            if (timeToLive.TotalSeconds <= 0) return Task.CompletedTask;

         
            var cacheOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpiration = expirationTime
            };

            _cache.Set($"blacklist:{token}", true, cacheOptions);

            return Task.CompletedTask;
        }

        public Task<bool> IsTokenBlacklistedAsync(string token)
        {
            return Task.FromResult(_cache.TryGetValue($"blacklist:{token}", out _));
        }
    }
}
