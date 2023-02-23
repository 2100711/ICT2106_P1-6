namespace CleanBrightCompany.Models
{
    public interface IStock
    {
        public int GetStock(IStockableItem item);
        public void SetStock(IStockableItem item, int qty);
    }
}