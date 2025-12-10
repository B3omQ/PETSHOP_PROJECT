using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Petshop_Server.Dtos;
using Petshop_Server.Models;

namespace Petshop_Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly PetShopContext _context;

        public ProductController(PetShopContext context)
        {
            _context = context;
        }

        // GET: api/product
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Pet)
                .Include(p => p.ProductImages)
                .Select(p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Description = p.Description,
                    Price = p.Price,
                    Stock = p.Stock,
                    CategoryName = p.Category.CategoryName,
                    PetName = p.Pet.PetName,
                    Images = p.ProductImages.Select(i => i.ImageUrl).ToList()
                })
                .ToListAsync();

            return Ok(products);
        }

        // GET: api/product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Pet)
                .Include(p => p.ProductImages)
                .Where(p => p.ProductId == id)
                .Select(p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Description = p.Description,
                    Price = p.Price,
                    Stock = p.Stock,
                    CategoryName = p.Category.CategoryName,
                    PetName = p.Pet.PetName,
                    Images = p.ProductImages.Select(i => i.ImageUrl).ToList()
                })
                .FirstOrDefaultAsync();

            if (product == null)
                return NotFound();

            return Ok(product);
        }
    }
}
