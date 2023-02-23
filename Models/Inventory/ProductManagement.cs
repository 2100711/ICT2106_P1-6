using CleanBrightCompany.Data;

namespace CleanBrightCompany.Models;

public class ProductManagement : IProduct
{
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
