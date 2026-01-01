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

        public async Task CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        }
    }
}
