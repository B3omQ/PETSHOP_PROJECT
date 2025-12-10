using System;
using System.Collections.Generic;

namespace Petshop_Server.Models;

public partial class Pet
{
    public int PetId { get; set; }

    public string PetName { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
