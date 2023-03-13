namespace CleanBrightCompany.Models;

public interface IRecommender : IProduct
{
    public int ID { get; }
    public string Name { get; }
    public string Category { get; }
    public string Brand { get; }
    public float Weight { get; }
    public float Price { get; }
    public int Stock { get; }
    public float carbonFootprint { get; }
}