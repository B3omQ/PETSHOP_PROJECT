using Petshop_Server.Dtos.Users;
using Petshop_Server.Repositories.Users;

namespace Petshop_Server.Services.Users
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<LoginResponse?> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetUserByEmail(email);
            if (user == null) return null;
            //if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            //{
            //    return null;
            //}
            if(!(password.Equals(user.PasswordHash)))
            {
                return null;
            }
            return new LoginResponse
            {
                Email = email,
                Role = user.Role,
            };
        }
    }
}
