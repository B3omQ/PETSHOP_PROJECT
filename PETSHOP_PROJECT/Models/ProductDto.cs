namespace PETSHOP_PROJECT.Models
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }

        public string CategoryName { get; set; }
        public string PetName { get; set; }

        public List<string> Images { get; set; } = new();
    }
}
