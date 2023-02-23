using CleanBrightCompany.Data;

namespace CleanBrightCompany.Models;

// Control class
public class StockManagement : IStock
{
    public int GetStock(IStockableItem item)
    {
        var productGw = DatabaseHandle.GetReadHandle<Product>();
        IStockableItem? stockable = productGw.Find(p => p.ID == item.GetStockId()).FirstOrDefault();
        if (stockable == null) return -1;
        return stockable.Stock;
    }

    public void SetStock(IStockableItem item, int qty)
    {
        var productGwRead = DatabaseHandle.GetReadHandle<Product>();
        Product? product = productGwRead.Find(p => p.ID == item.GetStockId()).FirstOrDefault();
        if (product == null) return;
        product.UpdateStock(qty);

        var productGwWrite = DatabaseHandle.GetWriteHandle<Product>();
        productGwWrite.Update(product);
    }
}