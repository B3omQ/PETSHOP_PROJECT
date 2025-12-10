using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PETSHOP_PROJECT.Models;
using PETSHOP_PROJECT.Services;

namespace PETSHOP_PROJECT.Pages.Product
{
    public class IndexModel : PageModel
    {
        private readonly ProductApiService _productService;

        public IndexModel(ProductApiService productService)
        {
            _productService = productService;
        }

        public List<ProductDto> Products { get; set; } = new();

        public async Task OnGet()
        {
            Products = await _productService.GetAllProductsAsync();
        }
    }
}
