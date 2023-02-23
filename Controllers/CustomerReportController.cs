using CleanBrightCompany.Data;
using CleanBrightCompany.Models;
using Microsoft.AspNetCore.Mvc;

namespace CleanBrightCompany.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerReportController : ControllerBase
{
    private readonly ILogger<CustomerReportController> _logger;

    public CustomerReportController(ILogger<CustomerReportController> logger)
    {
        _logger = logger;
        _logger.LogInformation("Inside CustomerReportController");
    }

    // Get Products
    [HttpGet("products/{year}/{month}")]
    public ActionResult<IEnumerable<Product>> GetProducts(int year, int month)
    {
        IProduct productManager = new ProductManagement();
        List<Product> products = productManager.GetAllProducts().Cast<Product>().ToList();
        // TODO: Filter based on year and month
        return Ok(products);
    }

    // Get Shippings
    // [HttpGet("shippings/{year}/{month}")]
    // public IEnumerable<Shipping> GetShipping(int year, int month)
    // {
    //     // Waiting for module 1
    // }
}