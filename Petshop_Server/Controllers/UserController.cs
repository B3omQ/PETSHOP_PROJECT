using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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

        public UserController(IUserService userService, IJWTService jWTService)
        {
            _userService = userService;
            _jWTService = jWTService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var user = await _userService.LoginAsync(loginRequest.Email, loginRequest.Password);
            if (user == null)
                return Unauthorized("Invalid email or password");

            var token = _jWTService.generateToken(user);

            //for deploy
            //var cookieOptions = new CookieOptions
            //{
            //    HttpOnly = true,  // JS không đọc được (Chống XSS)
            //    Secure = true,    // Chỉ chạy trên HTTPS (Localhost vẫn chạy được nếu dev cert ok)
            //    SameSite = SameSiteMode.Strict, // Chống CSRF
            //    Expires = DateTime.UtcNow.AddMinutes(60) // Thời gian sống của Cookie
            //};

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Sửa thành false để chạy được trên localhost http thường
                SameSite = SameSiteMode.Lax, // Đổi Strict thành Lax cho dễ thở hơn
                Expires = DateTime.UtcNow.AddDays(7),
                Path = "/"
            };

            Response.Cookies.Append("accessToken", token, cookieOptions);

            return Ok(new
            {
                user
            });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(SignUpRequest signUpRequest)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _userService.SignUpAsync(signUpRequest);
            return StatusCode(201);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("accessToken", new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Phải khớp với lúc tạo (nếu lúc tạo có Secure thì lúc xóa cũng phải có)
                SameSite = SameSiteMode.Lax,
                Path = "/"
            });

            return Ok();
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
