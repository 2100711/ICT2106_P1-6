namespace CleanBrightCompany.Models;

public class InventoryHistory
{
    public int AccountID { get; private set; }
    public int Category { get; private set; }
    public int StockNew { get; private set; }
    public int StockOld { get; private set; }
    public String Reason { get; private set; }
    public DateTime Date { get; private set; }

    public InventoryHistory(int accountID, int category, int stockNew, int stockOld, String reason, DateTime date)
    {
        this.AccountID = accountID;
        this.Category = category;
        this.StockNew = stockNew;
        this.StockOld = stockOld;
        this.Reason = reason;
        this.Date = date;
    }
}