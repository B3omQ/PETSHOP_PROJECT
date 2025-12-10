using System;
using System.Collections.Generic;

namespace Petshop_Server.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int? UserId { get; set; }

    public DateTime? OrderDate { get; set; }

    public decimal? TotalPrice { get; set; }

    public string? Status { get; set; }

    public string? GuestName { get; set; }

    public string? GuestEmail { get; set; }

    public string? GuestPhone { get; set; }

    public string? GuestAddress { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
