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

        public string generateToken(User user)
        {
            var jwtSettings = _config.GetSection("Jwt");
            var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);
            var accessMinutes = double.Parse(_config["Jwt:AccessTokenExpirationMinutes"]);

            var accessTokenExpires = DateTime.UtcNow.AddMinutes(accessMinutes);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                    {
                     new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                     new Claim(ClaimTypes.Email, user.Email),
                     new Claim(ClaimTypes.Role, user.Role) ,
                     new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    }),
                Expires = accessTokenExpires,

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
