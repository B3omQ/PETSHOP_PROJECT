using Petshop_Server.Dtos.Users;
using Petshop_Server.Models;

namespace Petshop_Server.Services.Users
{
    public interface IUserService
    {
        Task<LoginResponse?> LoginAsync(string email, string password);
        Task<SignUpResponse?> SignUpAsync(SignUpRequest signUpRequest);

        Task<LoginResponse?> GetByIdAsync(int id);
    }
}
