using Petshop_Server.Dtos.Category;
using Petshop_Server.Repositories.Category;

namespace Petshop_Server.Services.Category
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<GetAllCategoriesResponse>> getAllCategoriesAsync()
        {
            var categories = await _repository.getAllCategories();
            return categories;
        }
    }
}
