using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ICT2106_P1_6.Models;

namespace ICT2106_P1_6.Controllers;

public class DiscountController : Controller, IDiscount
{
  private readonly ILogger<DiscountController> _logger;

  public DiscountController(ILogger<DiscountController> logger)
  {
    _logger = logger;
  }

  public IActionResult Index()
  {
    return View();
  }

  [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
  public IActionResult Error()
  {
    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
  }

  public double calculateTotalCF()
  {
    double totalCF = 0;
    return totalCF;
  }

  public bool checkIfCriteriaIsMet(totalPurchasePrice, totalCF)
  {
    bool result = false;
    return result;
  }

  public string generateDiscountCode()
  {
    string code = "";
    return code;
  }
}
