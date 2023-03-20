using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CleanBrightCompany.Data;
using CleanBrightCompany.Models;
using ICT2106_P1_4;

namespace CleanBrightCompany.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ForecastController : ControllerBase
    {
        
        [HttpPost("predict")]
        public ActionResult<Goals> predict([FromBody] string[] data)
        {
            float[] listOfPredictionResults = new float[data.Length];
            int index = 0;
            foreach (string item in data)
            {
                Console.WriteLine("Printing Each " + item);
                //Load sample data
                var sampleData = new MLModel.ModelInput()
                {
                    Delivery_date = item,
                };

                //Load model and predict output
                var result = MLModel.Predict(sampleData);
                Console.WriteLine("Prediction each " + result.Score);
                listOfPredictionResults[index] = result.Score;
                index++;
                Console.WriteLine("Results should have " + listOfPredictionResults);
                Console.WriteLine();
            }

            Console.WriteLine("Hello" + listOfPredictionResults);
            return Ok(listOfPredictionResults);
        }

        
    }
}
