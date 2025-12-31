using Petshop_Server.Dtos.Users;

namespace Petshop_Server.Services.Users
{
    public interface IUserService
    {
        Task<LoginResponse?> LoginAsync(string email, string password);
        Task SignUpAsync(SignUpRequest signUpRequest);
    }
}
