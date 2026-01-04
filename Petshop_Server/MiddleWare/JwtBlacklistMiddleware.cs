using Petshop_Server.Services.RefreshTokens;

namespace Petshop_Server.MiddleWare
{
    public class JwtBlacklistMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtBlacklistMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, ITokenBlackListService blacklistService)
        {
            // 1. Lấy token từ Header hoặc Cookie
            // Ở đây mình lấy từ Cookie cho khớp với code của bạn
            var token = context.Request.Cookies["accessToken"];

            // Nếu không có token trong cookie, thử tìm trong Header (Authorization: Bearer ...)
            if (string.IsNullOrEmpty(token))
            {
                var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
                if (authHeader != null && authHeader.StartsWith("Bearer "))
                {
                    token = authHeader.Substring("Bearer ".Length).Trim();
                }
            }

            // 2. Kiểm tra Blacklist
            if (!string.IsNullOrEmpty(token))
            {
                var isBlacklisted = await blacklistService.IsTokenBlacklistedAsync(token);
                if (isBlacklisted)
                {
                    // Nếu bị cấm -> Trả về 401 ngay lập tức
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Token has been revoked.");
                    return; // Dừng lại, không cho đi tiếp vào Controller
                }
            }

            // 3. Nếu ổn -> Đi tiếp
            await _next(context);
        }
    }
}
