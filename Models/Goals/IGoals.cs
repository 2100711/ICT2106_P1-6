namespace CleanBrightCompany.Models;

public interface IGoals
{
    public int goalID { get; }
    public double cumulativeCF { get; }
    public double targetCF { get; }
    public int goalDuration { get; }
    public DateTime startDate { get; }
    public DateTime endDate { get; }
}

