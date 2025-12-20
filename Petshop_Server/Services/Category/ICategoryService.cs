using Petshop_Server.Dtos.Category;

namespace Petshop_Server.Services.Category
{
    public interface ICategoryService
    {
        Task<List<GetAllCategoriesResponse>> getAllCategoriesAsync();
    }
}
