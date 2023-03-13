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
            series.Name = "cumulativeCF";
            series.Add(chartData.Select(cd => cd.cumulativeCF).ToArray());

            XSeries xseries = chart.XValues.AddXSeries();
            xseries.Add(chartData.Select(cd => cd.startDate.ToString()).ToArray());

            section.AddParagraph("This graph shows the cumulativeCF over the previous months");

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            PdfDocumentRenderer pdfRenderer = new PdfDocumentRenderer();
            pdfRenderer.Document = document;
            pdfRenderer.RenderDocument();
            pdfRenderer.Save("output.pdf");

            var stream = new MemoryStream(System.IO.File.ReadAllBytes("output.pdf"));

            return File(stream, "application/octec-stream", "output.pdf");
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
