using Petshop_Server.Dtos.Product;

namespace Petshop_Server.Repositories.Product
{
    public interface IProductRepository
    {
        Task<List<SearchingProductResponse>> searchingProducts(string term);
    }
}
