using Petshop_Server.Dtos.Product;

namespace Petshop_Server.Services.Product
{
    public interface IProductService
    {
        Task<List<SearchingProductResponse>> searchingProductResponses(string? term, int? categoryId);
    }
}
