using BCrypt.Net;
using Petshop_Server.Dtos.Users;
using Petshop_Server.Models;
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

        public async Task<LoginResponse?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null)
            {
                return null;
            }

            return new LoginResponse
            {
                UserId = user.UserId,
                Email = user.Email,
                Role = user.Role
            };
        }

        public async Task<LoginResponse?> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetUserByEmail(email);
            if (user == null) return null;
            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null;
            }
            return new LoginResponse
            {
                UserId = user.UserId,
                Email = email,
                Role = user.Role,
            };
        }

        public async Task<SignUpResponse?> SignUpAsync(SignUpRequest signUpRequest)
        {
            var result = new SignUpResponse { Success = true };
            var hashPassword = BCrypt.Net.BCrypt.HashPassword(signUpRequest.Password);

            var isEmailExisted = CheckExistedEmailAsync(signUpRequest.Email);
            if(isEmailExisted)
            {
                result.Success = false;
                result.Errors.Add("email", "Email Already Existed!");
            }

            if (!result.Success) return result;

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
            return result; 
        }

        private bool CheckExistedEmailAsync(string email)
        {
            var user = _userRepository.GetUserByEmail(email);

            return user != null;
        }
    }
}
