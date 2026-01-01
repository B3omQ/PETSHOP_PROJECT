using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Petshop_Server.Dtos.Users;
using Petshop_Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Petshop_Server.Services.JWT
{
    public class JWTService : IJWTService
    {
        private readonly IConfiguration _config;

        public JWTService(IConfiguration config)
        {
            _config = config;
        }

        public string generateToken(LoginResponse user)
        {
            //var claims = new[]
            //{
            //    new Claim(ClaimTypes.NameIdentifier , user.UserId.ToString()),
            //    new Claim(ClaimTypes.Email, user.Email),
            //    new Claim(ClaimTypes.Role, user.Role)
            //};

            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            //var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //var token = new JwtSecurityToken(
            //issuer: _config["Jwt:Issuer"],
            //audience: _config["Jwt:Audience"],
            //claims: claims,
            //expires: DateTime.UtcNow.AddDays(int.Parse(_config["Jwt:ExpireDays"])),
            //signingCredentials: creds
            //);

            //return new JwtSecurityTokenHandler().WriteToken(token);

            var jwtSettings = _config.GetSection("Jwt");
            var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);
            var minutes = double.Parse(jwtSettings["AccessTokenExpirationMinutes"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        }),
                // SỬA: Dùng AddMinutes thay vì AddDays
                Expires = DateTime.UtcNow.AddMinutes(minutes),

                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}
