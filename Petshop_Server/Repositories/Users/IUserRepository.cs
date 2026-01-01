
using Petshop_Server.Dtos.Users;
using Petshop_Server.Models;

namespace Petshop_Server.Repositories.Users
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmail(string email);
        Task CreateUser(User user); 
        Task<User?> GetUserById(int id);
    }
}
