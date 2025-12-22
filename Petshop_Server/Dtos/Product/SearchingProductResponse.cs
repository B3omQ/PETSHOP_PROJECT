using Petshop_Server.Models;

namespace Petshop_Server.Dtos.Product
{
    public class SearchingProductResponse
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public  List<SearchingProductImageResponse> ProductImages { get; set; }
    }
}