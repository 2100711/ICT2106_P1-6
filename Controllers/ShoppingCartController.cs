using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    public class ShoppingCartController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
