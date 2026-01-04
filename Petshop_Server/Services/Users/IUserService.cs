using Petshop_Server.Dtos.Users;
using Petshop_Server.Models;

namespace Petshop_Server.Services.Users
{
    public interface IUserService
    {
        Task<LoginResponse?> LoginAsync(LoginRequest loginRequest);

        Task LogoutAsync(string refreshToken);
        Task<InformResponse?> SignUpAsync(SignUpRequest signUpRequest);

        Task<User?> GetByIdAsync(int id);

        Task<InformResponse?> ForgotPasswordAsync(string email);

        Task<RefreshTokenResponse?> RefreshToken(string refreshToken);
    }
}
