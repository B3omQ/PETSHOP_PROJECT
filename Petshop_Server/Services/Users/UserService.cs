using Azure;
using Azure.Core;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Petshop_Server.Dtos.Users;
using Petshop_Server.Models;
using Petshop_Server.Repositories.RefreshTokens;
using Petshop_Server.Repositories.Users;
using Petshop_Server.Services.JWT;
using Petshop_Server.Services.RefreshTokens;

namespace Petshop_Server.Services.Users
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IJWTService _jWTService;
        private readonly IConfiguration _config;

        public UserService(IUserRepository userRepository, IJWTService jWTService,
            IConfiguration config, IRefreshTokenService refreshTokenService , IRefreshTokenRepository refreshTokenRepository)
        {
            _userRepository = userRepository;
            _jWTService = jWTService;
            _config = config;
            _refreshTokenService = refreshTokenService;
            _refreshTokenRepository = refreshTokenRepository;
        }


        public async Task<User?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null)
            {
                return null;
            }

            return user;
        }

        public async Task<LoginResponse?> LoginAsync(LoginRequest loginRequest)
        {
            var user = await _userRepository.GetUserByEmail(loginRequest.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            {
                return null;
            }
            var accessMinutes = double.Parse(_config["Jwt:AccessTokenExpirationMinutes"]);
            var refreshDays = double.Parse(_config["Jwt:RefreshTokenExpirationDays"]);

            var accessTokenExpires = DateTime.UtcNow.AddMinutes(accessMinutes);
            var refreshTokenExpires = DateTime.UtcNow.AddDays(refreshDays);

            var accessToken = _jWTService.generateToken(user);
            var refreshToken = _jWTService.GenerateRefreshToken();


            await _refreshTokenService.RemoveTokenExpireByUserId(user.UserId);

            var refreshTokenEntity = new RefreshToken
            {
                Token = refreshToken,
                UserId = user.UserId,
                Expires = DateTime.UtcNow.AddDays(refreshDays)
            };

            await _refreshTokenService.AddRefreshToken(refreshTokenEntity);

            return new LoginResponse
            {
                AccessToken = accessToken,
                AccessTokenExpires = accessTokenExpires,
                RefreshToken = refreshToken,
                RefreshTokenExpires = refreshTokenExpires,
                UserResponse = new UserResponse
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    FullName = user.FullName,
                    Phone = user.Phone,
                    Address = user.Address,
                    Role = user.Role,
                }
            };
        }


        public async Task<InformResponse?> SignUpAsync(SignUpRequest signUpRequest)

        {

            var hashPassword = BCrypt.Net.BCrypt.HashPassword(signUpRequest.Password);



            var isEmailExisted = await CheckExistedEmailAsync(signUpRequest.Email);



            if (isEmailExisted)
            {

                return new InformResponse
                {
                    Success = false,
                    Errors = new Dictionary<string, string> { { "email", "Email Already Existed!" } }
                };

            }


            var newUser = new User

            {

                Email = signUpRequest.Email,

                PasswordHash = hashPassword,

                FullName = signUpRequest.FullName,

                Phone = signUpRequest.Phone,

                Address = signUpRequest.Address,

                CreatedAt = DateTime.Now,

            };


            await _userRepository.CreateUser(newUser);

            return new InformResponse
            {
                Success = true,
                Message = "Sign Up Successfully !"
            };
        }

        public async Task<InformResponse?> ForgotPasswordAsync(string email)
        {
            var result = await CheckExistedEmailAsync(email);
            if (!result)
            {
                return new InformResponse
                {
                    Success = false,
                    Errors = new Dictionary<string, string> { { "email", "Invalid Email" } }
                };
            }
            return new InformResponse
            {
                Success = true,
                Message = "Reset link sent"
            };
        }

        private async Task<bool> CheckExistedEmailAsync(string email)

        {
            var user = await _userRepository.GetUserByEmail(email);
            if (user != null)
            {
                return true;
            }
            return false;
        }

        public async Task LogoutAsync(string refreshToken)
        {
            var response = await _refreshTokenService.GetRefreshTokenByRefreshToken(refreshToken);
            if(response != null)
            {
                await _refreshTokenService.UpdateRefreshToken(response);
            }   
            return;
        }

        public async Task<RefreshTokenResponse?> RefreshToken(string refreshToken)
        {
            var existingRefreshToken = await _refreshTokenRepository.GetRefreshTokenByRefreshToken(refreshToken);
            if (existingRefreshToken != null || existingRefreshToken.IsActive)
            {
                var user = await _userRepository.GetUserById(existingRefreshToken.UserId);

                if (user == null) return null;
                var newAccessToken = _jWTService.generateToken(user);
                var newRefreshToken = _jWTService.GenerateRefreshToken();

                var accessMinutes = double.Parse(_config["Jwt:AccessTokenExpirationMinutes"]);
                var refreshDays = double.Parse(_config["Jwt:RefreshTokenExpirationDays"]);

                var accessTokenExpires = DateTime.UtcNow.AddMinutes(accessMinutes);
                var refreshTokenExpires = DateTime.UtcNow.AddDays(refreshDays);


                existingRefreshToken.Revoked = DateTime.UtcNow;
                var newRefreshTokenEntity = new RefreshToken
                {
                    Token = newRefreshToken,
                    UserId = user.UserId,
                    Expires = refreshTokenExpires
                };
                await _refreshTokenService.RemoveTokenExpireByUserId(user.UserId);
                await _refreshTokenService.AddRefreshToken(newRefreshTokenEntity);
                return new RefreshTokenResponse
                {
                    AccessToken = newAccessToken,
                    AccessTokenExpires = accessTokenExpires,
                    RefreshToken = newRefreshToken,
                    RefreshTokenExpires = refreshTokenExpires,
                };
            }
            return null;
        }
    }
}
