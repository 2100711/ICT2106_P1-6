using CleanBrightCompany.Models;
using CleanBrightCompany.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CleanBrightCompany.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecommenderController : ControllerBase
{
    private readonly ILogger<RecommenderController> _logger;

    public RecommenderController(ILogger<RecommenderController> logger)
    {
        _logger = logger;
    }

    [HttpGet("degreaser")]
    // GET: api/recommender
    // Returns: List of top 3 products that have lowest carbon footprint
    public ActionResult<ProductVM> comparator_degreaser()
    {
        IRecommender recommendProduct = new Recommender();
        var getProducts = recommendProduct.GetAllProducts();
        var top3LowestCarbonFootprintDegreaser = getProducts.Where(r => r.Category == "Degreaser").OrderByDescending(r => r.Stock).TakeLast(3).Cast<Product>().ToList();
        return Ok(new ProductVM(top3LowestCarbonFootprintDegreaser));
    }

    [HttpGet("detergent")]
    // GET: api/recommender
    // Returns: List of top 3 products that have lowest carbon footprint
    public ActionResult<ProductVM> comparator_detergent()
    {
        IRecommender recommendProduct = new Recommender();
        var getProducts = recommendProduct.GetAllProducts();
        var top3LowestCarbonFootprintDetergent = getProducts.Where(r => r.Category == "Detergent").OrderByDescending(r => r.Stock).TakeLast(3).Cast<Product>().ToList();
        return Ok(new ProductVM(top3LowestCarbonFootprintDetergent));
    }

    [HttpGet("acid")]
    // GET: api/recommender
    // Returns: List of top 3 products that have lowest carbon footprint
    public ActionResult<ProductVM> comparator_acid()
    {
        IRecommender recommendProduct = new Recommender();
        var getProducts = recommendProduct.GetAllProducts();
        var top3LowestCarbonFootprintDetergent = getProducts.Where(r => r.Category == "Acid").OrderByDescending(r => r.Stock).TakeLast(3).Cast<Product>().ToList();
        return Ok(new ProductVM(top3LowestCarbonFootprintDetergent));
    }

    [HttpGet("abrasives")]
    // GET: api/recommender
    // Returns: List of top 3 products that have lowest carbon footprint
    public ActionResult<ProductVM> comparator_abrasives()
    {
        IRecommender recommendProduct = new Recommender();
        var getProducts = recommendProduct.GetAllProducts();
        var top3LowestCarbonFootprintDetergent = getProducts.Where(r => r.Category == "Abrasives").OrderByDescending(r => r.Stock).TakeLast(3).Cast<Product>().ToList();
        return Ok(new ProductVM(top3LowestCarbonFootprintDetergent));
    }

    // [HttpGet]
    // // Returns: Product category
    // public ActionResult<ProductVM> checkProductCategory(string category)
    // {
    //     //Incomplete
    //     IProduct productManager = new ProductManagement();
    //     var products = productManager.GetAllProducts();
    //     var productCategory = products.Select(p => p.Category == category).Cast<Product>().ToList();
    //     return Ok(new ProductVM(productCategory));
    // }

    // [HttpGet]
    // // Return: Product in stock
    // public IActionResult checkProductInStock(int id)
    // {
    //     IProduct productManager = new ProductManagement();
    //     IProductItem? product = productManager.GetProductById(id);
    //     if (product == null) return NotFound();

    //     IStockableItem stockable = (IStockableItem)product;
    //     IStock stockManager = new StockManagement();
    //     stockManager.GetStock(stockable);
    //     return Ok();
    // }

    // [HttpGet]
    // // Returns: Carbon footprint per dollar
    // public ActionResult<ProductVM> calculateCarbonFootprintPerDollar(float carbonFootprint, float price)
    // {
    //     //To do
    //     return Ok();
    // }
}