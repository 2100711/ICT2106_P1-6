using CleanBrightCompany.Models;

namespace CleanBrightCompany.ViewModels;

public class ProductVM
{
    public List<Product>? Products { get; private set; }

    public ProductVM(List<Product> products)
    {
        Products = products;
    }
}