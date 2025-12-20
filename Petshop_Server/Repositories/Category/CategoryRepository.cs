using Microsoft.EntityFrameworkCore;
using Petshop_Server.Dtos.Category;
using Petshop_Server.Models;

namespace Petshop_Server.Repositories.Category
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly PetShopContext context;
        public CategoryRepository(PetShopContext context)
        {
            this.context = context;
        }

        public async Task<List<GetAllCategoriesResponse>> getAllCategories()
        {
            return await context.Categories.Select(c => new GetAllCategoriesResponse
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName,
            }).ToListAsync();
        }
    }
}
