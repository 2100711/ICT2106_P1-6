using CleanBrightCompany.Data;
using CleanBrightCompany.Models;
using ICT2106_P1_4.Models.Goals;
using Microsoft.AspNetCore.Mvc;

using MigraDoc.DocumentObjectModel;
using MigraDoc.DocumentObjectModel.Shapes.Charts;
using MigraDoc.Rendering;
using System.Buffers.Text;
using System.IO;
using System.Text;

namespace ICT2106_P1_6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarbonFootprintReportController : ControllerBase
    {
        private readonly CleanBrightCompanyDBContext _context;
        private Document? document;
        public CarbonFootprintReportController(CleanBrightCompanyDBContext context)
        {
            _context = context;
        }


        [HttpGet("createreport")]
        public IActionResult createReport()
        {
            Document document = new Document();
            Section section = document.AddSection();

            var chart = section.AddChart(ChartType.Line);
            chart.Width = "15cm";
            chart.Height = "10cm";
            chart.XAxis.MajorTickMark = TickMarkType.Outside;
            chart.XAxis.Title.Caption = "Date";
            chart.YAxis.MajorTickMark = TickMarkType.Outside;
            chart.YAxis.Title.Caption = "Cumulative CF";
            chart.PlotArea.LineFormat.Color = Colors.DarkGray;
            chart.PlotArea.LineFormat.Width = 1;

            IGoalsManagement goalManager = GoalsManagement.Instance;
            var chartData = goalManager.GetAllGoals();

            chartData = chartData.OrderBy(e => e.startDate).ToList();

            Series series = chart.SeriesCollection.AddSeries();
            series.Name = "Cumulative CF";
            var cfArray = chartData.Select(cd => cd.cumulativeCF).ToArray();
            series.Add(cfArray);

            XSeries xseries = chart.XValues.AddXSeries();
            var dateArray = chartData.Select(cd => cd.startDate.ToString("dd/MM/yy")).ToArray();
            xseries.Add(dateArray);

            section.AddParagraph("");
            section.AddParagraph("This graph shows the cumulative carbon footprint over the previous months.");

            Array.Reverse(cfArray);
            Array.Reverse(dateArray);

            if (cfArray[1] < cfArray[2])
            {
                double amount = cfArray[2] - cfArray[1];
                section.AddParagraph("There is a decrease of " + amount.ToString() + " units in carbon footprint in the previous goal as compared to the second last goal.");
            }
            else if (cfArray[2] < cfArray[1])
            {
                double amount = cfArray[1] - cfArray[2];
                section.AddParagraph("There is an increase of " + amount.ToString() + " units in carbon footprint in the previous goal as compared to the second last goal.");
            }
            else
            {
                section.AddParagraph("The carbon footprint in the last goal remains unchanged as compared to the second last goal.");
            }

            section.AddParagraph("The average recorded carbon footprint of the company is " + ((cfArray.Sum() - cfArray[1]) / (cfArray.Length - 1)).ToString() + ", excluding the ongoing goal.");


            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            PdfDocumentRenderer pdfRenderer = new PdfDocumentRenderer();
            pdfRenderer.Document = document;
            pdfRenderer.RenderDocument();
            pdfRenderer.Save("output.pdf");

            var stream = new MemoryStream(System.IO.File.ReadAllBytes(@"output.pdf"));

            return File(stream, "application/octec-stream", @"output.pdf");
        }

        [HttpGet]
        public IActionResult generateReport()
        {
            if (document == null)
            {
                return BadRequest();
            }
            var section = document.AddSection();
            section.AddParagraph("This graph shows the cumulativeCF over the previous months");
            return Ok();
        }
    }
}

