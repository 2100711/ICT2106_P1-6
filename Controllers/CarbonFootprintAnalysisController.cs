using CleanBrightCompany.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ICT2106_P1_6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarbonFootprintAnalysisController : ControllerBase
    {
        private readonly ILogger<CarbonFootprintAnalysisController> _logger;

        [HttpGet]
        public IActionResult createChart()
        {
            // TODO: implement
            return Ok();
        }

        [HttpGet]
        public IActionResult generateReport()
        {
            // TODO: implement
            return Ok();
        }

        [HttpGet]
        public IActionResult exportReport()
        {
            // TODO: implement
            return Ok();
        }
    }
}
