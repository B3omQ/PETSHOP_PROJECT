using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Petshop_Server.Dtos.Users;
using Petshop_Server.Models;
using Petshop_Server.Services.JWT;
using Petshop_Server.Services.Users;
using System.Security.Claims;

namespace Petshop_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJWTService _jWTService;
        private readonly PetShopContext _context;
        private readonly IConfiguration _config;

        public UserController(IUserService userService, IJWTService jWTService, PetShopContext context
            , IConfiguration config)
        {
            _userService = userService;
            _jWTService = jWTService;
            _context = context;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var user = await _userService.LoginAsync(loginRequest.Email, loginRequest.Password);
            if (user == null)
                return Unauthorized("Invalid email or password");


            var accessMinutes = double.Parse(_config["Jwt:AccessTokenExpirationMinutes"]);
            var refreshDays = double.Parse(_config["Jwt:RefreshTokenExpirationDays"]);

            var accessToken = _jWTService.generateToken(user);
            var refreshToken = _jWTService.GenerateRefreshToken();

            var refreshTokenEntity = new RefreshToken
            {
                Token = refreshToken,
                UserId = user.UserId,
                Expires = DateTime.UtcNow.AddDays(refreshDays)
            };
            var oldTokens = _context.RefreshTokens
           .Where(t => t.UserId == user.UserId && (t.Revoked != null || t.Expires < DateTime.UtcNow)).ToList();

            if (oldTokens.Any())
            {
                _context.RefreshTokens.RemoveRange(oldTokens);
            }

            _context.RefreshTokens.Add(refreshTokenEntity);
            await _context.SaveChangesAsync();

            //for deploy
            //var cookieOptions = new CookieOptions
            //{
            //    HttpOnly = true,  // JS không đọc được (Chống XSS)
            //    Secure = true,    // Chỉ chạy trên HTTPS (Localhost vẫn chạy được nếu dev cert ok)
            //    SameSite = SameSiteMode.Strict, // Chống CSRF
            //    Expires = DateTime.UtcNow.AddMinutes(60) // Thời gian sống của Cookie
            //};


            SetCookie("accessToken", accessToken, DateTime.UtcNow.AddMinutes(accessMinutes));
            SetCookie("refreshToken", refreshToken, DateTime.UtcNow.AddDays(refreshDays));


            return Ok(new
            {
                user
            });
        }

        private void SetCookie(string key, string value, DateTime expires)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = expires,
                Path = "/"
            };
            Response.Cookies.Append(key, value, cookieOptions);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Không có Refresh Token");
            }

            var storedToken = await _context.RefreshTokens
        .FirstOrDefaultAsync(x => x.Token == refreshToken);

            if (storedToken == null || !storedToken.IsActive)
            {
                return Unauthorized("Refresh Token không hợp lệ hoặc đã hết hạn");
            }
            var user = await _userService.GetByIdAsync(storedToken.UserId);

            var oldTokens = _context.RefreshTokens
            .Where(t => t.UserId == user.UserId && (t.Revoked != null || t.Expires < DateTime.UtcNow)).ToList();

            if (oldTokens.Any())
            {
                _context.RefreshTokens.RemoveRange(oldTokens);
            }

            if (user == null) return Unauthorized("User không tồn tại");

            var newAccessToken = _jWTService.generateToken(user);
            var newRefreshToken = _jWTService.GenerateRefreshToken();

            storedToken.Revoked = DateTime.UtcNow;
            var newRefreshTokenEntity = new RefreshToken
            {
                Token = newRefreshToken,
                UserId = user.UserId,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            _context.RefreshTokens.Add(newRefreshTokenEntity);
            await _context.SaveChangesAsync();

            SetCookie("accessToken", newAccessToken, DateTime.UtcNow.AddMinutes(15));
            SetCookie("refreshToken", newRefreshToken, DateTime.UtcNow.AddDays(7));

            return Ok(new { Message = "Refreshed successfully" });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (!string.IsNullOrEmpty(refreshToken))
            {
                var storedToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(x => x.Token == refreshToken);

                if (storedToken != null)
                {
                    storedToken.Revoked = DateTime.UtcNow; // Hủy token trong DB
                    await _context.SaveChangesAsync();
                }
            }

            DeleteCookie("accessToken");
            DeleteCookie("refreshToken");

            return Ok(new { Message = "Logged out successfully" });
        }

        private void DeleteCookie(string key)
        {
            Response.Cookies.Delete(key, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Path = "/"
            });
        }



        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(SignUpRequest signUpRequest)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var response = await _userService.SignUpAsync(signUpRequest);
            if (!response.Success)
            {
                return BadRequest(new
                {
                    message = "Validation failed",
                    errors = response.Errors
                });
            }
            return Created("", new
            {
                status = StatusCodes.Status201Created,
                message = "Sign Up succesfully"
            });
        }



        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetUserProfile()
        {
            // SỬA LẠI: Dùng đúng ClaimTypes.NameIdentifier
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            // Hoặc kiểm tra xem có claim nào không để debug
            if (userId == null)
            {
                return Ok(new
                {
                    Message = "Đã nhận được Token nhưng không tìm thấy UserID!",
                    AllClaims = User.Claims.Select(c => c.Type + ": " + c.Value) // In ra để xem
                });
            }

            return Ok(new
            {
                Message = "Test thành công! Server đã nhận được Cookie.",
                UserId = userId,
                ServerTime = DateTime.Now
            });
        }
    }
}
