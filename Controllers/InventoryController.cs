using CleanBrightCompany.Models;
using CleanBrightCompany.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CleanBrightCompany.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InventoryController : ControllerBase
{
    private readonly ILogger<InventoryController> _logger;

    public InventoryController(ILogger<InventoryController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    // GET: api/inventory
    // Returns: List of all products
    public ActionResult<ProductVM> Get()
    {
        IProduct productManager = new ProductManagement();
        List<Product> products = productManager.GetAllProducts().Cast<Product>().ToList();
        return Ok(new ProductVM(products));
    }

    [HttpGet]
    [Route("dashboard")]
    // GET: api/inventory/dashboard
    // Returns: Top 5 fastest moving products, top 5 lowest stock, update history
    public ActionResult<ProductVM> GetDashboard()
    {
        IProduct productManager = new ProductManagement();
        var products = productManager.GetAllProducts();
        var top5FastMoving = products.OrderBy(p => p.Stock).Cast<Product>().ToList();
        var top5LowestStock = products.OrderByDescending(p => p.Stock).Cast<Product>().ToList();
        var updateHistory = products.OrderByDescending(p => p.ID).Cast<Product>().ToList();
        return Ok(new InventoryVM(top5FastMoving, top5LowestStock, updateHistory));
    }

    [HttpPut]
    [Route("stock/{id}")]
    // PUT: api/inventory/stock/{id}
    // Query params: quantity (int)
    public IActionResult UpdateStock(int id, [FromQuery] int quantity)
    {
        IProduct productManager = new ProductManagement();
        IProductItem? product = productManager.GetProductById(id);
        if (product == null) return NotFound();

        IStockableItem stockable = (IStockableItem)product;
        IStock stockManager = new StockManagement();
        stockManager.SetStock(stockable, quantity);
        return Ok();
    }

    // [HttpPost]
    // [Route("products/create")]
    // // GET: api/inventory/products/create
    // public IActionResult CreateProduct(Product product)
    // {
    //     return Ok();
    // }
}
