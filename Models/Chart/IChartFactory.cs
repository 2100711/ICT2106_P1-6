namespace CleanBrightCompany.Models;

public interface IChartFactory
{
    public Chart getChart(string chartType);
}