using Microsoft.EntityFrameworkCore;
using Petshop_Server.Dtos.Product;
using Petshop_Server.Models;

namespace Petshop_Server.Repositories.Product
{
    public class ProductRepository : IProductRepository
    {
        private readonly PetShopContext _context;

        public ProductRepository(PetShopContext context)
        {
            _context = context;
        }

        public async Task<List<SearchingProductResponse>> searchingProducts(string? term, int? categoryId)
        {
            var query = _context.Products.Include(p => p.ProductImages).Include(p => p.Category).AsQueryable();

            if (!string.IsNullOrEmpty(term))
            {
                query = query.Where(p => p.ProductName.Contains(term));
            }
            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId);
            }

            return await query.Select(p => new SearchingProductResponse
            {
                ProductName = p.ProductName,
                ProductId = p.ProductId,
                Description = p.Description,
                Price = p.Price,
                ProductImages = p.ProductImages.Select(pm => new SearchingProductImageResponse
                {
                    ImageUrl = pm.ImageUrl
                }).ToList(),
            }).ToListAsync();
        }
    }
}

