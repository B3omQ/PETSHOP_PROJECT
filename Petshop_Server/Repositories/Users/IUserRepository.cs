
using Petshop_Server.Models;

namespace Petshop_Server.Repositories.Users
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmail(string email);
    }
}
