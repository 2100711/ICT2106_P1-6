namespace CleanBrightCompany.Models;

public interface IProductItem : IStockableItem
{
    public int ID { get; }
    public string Name { get; }
    public string Category { get; }
    public string Brand { get; }
    public float Weight { get; }
    public float Price { get; }
}