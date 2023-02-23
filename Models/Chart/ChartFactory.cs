namespace CleanBrightCompany.Models;

public class ChartFactory : IChartFactory
{
    public Chart getChart(string chartType)
    {
        if (chartType == "line")
        {
            return new LineChart();
        }
        else if (chartType == "bar")
        {
            return new BarChart();
        }
        else if (chartType == "pie")
        {
            return new PieChart();
        }

        return new LineChart();
    }
}