using System.ComponentModel.DataAnnotations;
using CleanBrightCompany.Data;

namespace CleanBrightCompany.Models;

public class Recommender : IRecommender
{
    [Key]
    public int ID { get; private set; }
    public string Name { get; private set; }
    public string Category { get; private set; }
    public string Brand { get; private set; }
    public int Stock { get; private set; }
    public float Price { get; private set; }
    public float Weight { get; private set; }
    public float carbonFootprint { get; private set; }
    public string Description { get; private set; }

    public int GetStockId()
    {
        return this.ID;
    }

    public void AddProduct(IProductItem product)
    {
        var productGw = DatabaseHandle.GetWriteHandle<Product>();
        productGw.Create((Product)product);
    }

    public void AddProduct(IEnumerable<IProductItem> products)
    {
        var productGw = DatabaseHandle.GetWriteHandle<Product>();
        foreach (var product in products)
        {
            productGw.Create((Product)product);
        }
    }

    public void DeleteProduct(IProductItem product)
    {
        var productGw = DatabaseHandle.GetWriteHandle<Product>();
        productGw.Delete(product.ID.ToString());
    }

    public List<IProductItem> GetAllProducts()
    {
        var productGw = DatabaseHandle.GetReadHandle<Product>();
        return productGw.GetAll().Cast<IProductItem>().ToList();
    }

    public IProductItem? GetProductById(int productID)
    {
        var productGw = DatabaseHandle.GetReadHandle<Product>();
        return productGw.Find(p => p.ID == productID).Cast<IProductItem>().FirstOrDefault();
    }

    public List<IProductItem> Search(Func<IProductItem, bool> filter)
    {
        var productGw = DatabaseHandle.GetReadHandle<Product>();
        return productGw.Find(p => filter(p)).Cast<IProductItem>().ToList();
    }

}