namespace ICT2106_P1_6.Models
{
  public class Discounts
  {
    private string discountCodeId;
    private double discountAmount;
    private double minimalTotalPurchasePrice;
    private double totalCFPerDollarOfPurchases;
    private double CFThreshold;

    private double DiscountAmount { get => discountAmount; set => discountAmount = value; }
    private double MinimalTotalPurchasePrice { get => minimalTotalPurchasePrice; set => minimalTotalPurchasePrice = value; }
    private double TotalCFPerDollarOfPurchases { get => totalCFPerDollarOfPurchases; set => totalCFPerDollarOfPurchases = value; }
    private double CFThreshold1 { get => CFThreshold; set => CFThreshold = value; }
    private string DiscountCodeId { get => discountCodeId; set => discountCodeId = value; }
  }
}