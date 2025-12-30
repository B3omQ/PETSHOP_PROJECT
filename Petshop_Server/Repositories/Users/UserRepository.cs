using Microsoft.EntityFrameworkCore;
using Petshop_Server.Models;

namespace Petshop_Server.Repositories.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly PetShopContext _context;
        public UserRepository(PetShopContext context)
        {
            _context = context;
        }
        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}
