
namespace Petshop_Server.Dtos
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int? Stock { get; set; }
        public string CategoryName { get; set; } = null!;
        public string PetName { get; set; } = null!;
        public List<string> Images { get; set; } = new();
    }
}
