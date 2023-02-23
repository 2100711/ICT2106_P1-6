namespace CleanBrightCompany.Models;

public interface IStockableItem
{
    public int Stock { get; }

    public int GetStockId();
}