using Petshop_Server.Dtos.Users;
using Petshop_Server.Models;

namespace Petshop_Server.Services.JWT
{
    public interface IJWTService
    {
        string generateToken(User user);
        string GenerateRefreshToken();
    }
}
