using Petshop_Server.Dtos.Product;
using Petshop_Server.Repositories.Product;

namespace Petshop_Server.Services.Product
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public Task<List<SearchingProductResponse>> searchingProductResponses(string? term , int? categoryId)
        {
            return _repository.searchingProducts(term , categoryId);
        }
    }
}
