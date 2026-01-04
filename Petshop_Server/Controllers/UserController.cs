using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Petshop_Server.Dtos.Users;
using Petshop_Server.Services.RefreshTokens;
using Petshop_Server.Services.Users;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Petshop_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenBlackListService _tokenBlackListService;

        public UserController(IUserService userService , ITokenBlackListService tokenBlackListService)
        {
            _userService = userService;
            _tokenBlackListService = tokenBlackListService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var response = await _userService.LoginAsync(loginRequest);
            if (response == null)
                return Unauthorized("Invalid email or password");

            SetCookie("accessToken", response.AccessToken, response.AccessTokenExpires);
            SetCookie("refreshToken", response.RefreshToken, response.RefreshTokenExpires);


            return Ok(response.UserResponse);
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
                return Unauthorized("No Refresh Token");
            }

            var response = await _userService.RefreshToken(refreshToken);
            if (response == null)
            {
                return Unauthorized();
            }

            SetCookie("accessToken", response.AccessToken, response.AccessTokenExpires);
            SetCookie("refreshToken", response.RefreshToken, response.RefreshTokenExpires);

            return Ok(new { Message = "Refreshed successfully" });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var accessToken = Request.Cookies["accessToken"];

            if (!string.IsNullOrEmpty(accessToken))
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(accessToken) as JwtSecurityToken;

                if (jsonToken != null)
                {
                    var expirationDate = jsonToken.ValidTo;

                    await _tokenBlackListService.BlacklistTokenAsync(accessToken, expirationDate);
                }
            }
            var refreshToken = Request.Cookies["refreshToken"];
            if (!string.IsNullOrEmpty(refreshToken))
            {
                await _userService.LogoutAsync(refreshToken);
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

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest forgotPasswordRequest)
        {
            var response = await _userService.ForgotPasswordAsync(forgotPasswordRequest.Email);
            if (!response.Success)
            {
                return NotFound(new
                {
                    message = "Validation Fail",
                    errors = response.Errors
                });
            }
            return Ok(response);
        }
    }
}
