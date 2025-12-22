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

        public async Task<List<SearchingProductResponse>> searchingProducts(string term)
        {
            return await _context.Products.Include(p => p.ProductImages).Where(p => p.ProductName.Contains(term))
                 .Select(p => new SearchingProductResponse
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

