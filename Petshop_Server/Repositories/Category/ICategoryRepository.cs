using Petshop_Server.Dtos.Category;

namespace Petshop_Server.Repositories.Category
{
    public interface ICategoryRepository
    {
        Task<List<GetAllCategoriesResponse>> getAllCategories();
    }
}
