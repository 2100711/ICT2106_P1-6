using CleanBrightCompany.Models;

namespace CleanBrightCompany.ViewModels;

public class InventoryVM
{
    public InventoryVM(List<Product> topFastestMovingStock, List<Product> topLowestStock, List<Product> products)
    {
        TopFastestMovingStock = topFastestMovingStock;
        TopLowestStock = topLowestStock;
        Products = products;
    }

    public List<Product> TopFastestMovingStock { get; private set; }
    public List<Product> TopLowestStock { get; private set; }
    public List<Product> Products { get; private set; }
}