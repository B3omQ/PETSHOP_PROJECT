using PETSHOP_PROJECT.Models;

namespace PETSHOP_PROJECT.Services
{
    public class ProductApiService
    {
        private readonly HttpClient _http;

        public ProductApiService(HttpClient http)
        {
            _http = http;
        }

        public async Task<List<ProductDto>> GetAllProductsAsync()
        {
            var result = await _http.GetFromJsonAsync<List<ProductDto>>("api/product");
            return result ?? new List<ProductDto>();
        }
    }
}
