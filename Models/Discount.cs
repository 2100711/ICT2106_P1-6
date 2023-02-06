using Microsoft.AspNetCore.Identity;

namespace ICT2106_P1_6.Models
{
    public class Discount
    {
        private static string? discountCodeId { get; set; }
        private static double discountAmount { get; set; }
        private static double minimalTotalPurchasePrice { get; set; }
        private static double totalCFPerDollarOfPurchases { get; set; }
        private static double CFThreshold { get; set; }
    }
}