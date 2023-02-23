using System.ComponentModel.DataAnnotations;

namespace CleanBrightCompany.Models;

public class Product : IProductItem
{
    [Key]
    public int ID { get; private set; }
    public string Name { get; private set; }
    public string Category { get; private set; }
    public string Brand { get; private set; }
    public int Stock { get; private set; }
    public float Price { get; private set; }
    public float Weight { get; private set; }
    public float CarbonFootprint { get; private set; }
    public string Description { get; private set; }

    public Product(int ID, string name, string category, string brand, int stock = 0, float price = 0f, float weight = 0f, float carbonFootprint = 0f, string description = "")
    {
        this.ID = ID;
        this.Name = name;
        this.Category = category;
        this.Brand = brand;
        this.Stock = stock;
        this.Price = price;
        this.Weight = weight;
        this.CarbonFootprint = carbonFootprint;
        this.Description = description;
    }

    public int GetStockId()
    {
        return this.ID;
    }

    public void UpdateStock(int newStock)
    {
        this.Stock = newStock;
    }
}