using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Petshop_Server.Services.Users;

namespace Petshop_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var user = await _userService.LoginAsync(loginRequest.Email, loginRequest.Password);
            if(user == null)
                return Unauthorized("Invalid email or password");
            return Ok(user);
        }
    }
}
