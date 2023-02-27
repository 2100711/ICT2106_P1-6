using System.ComponentModel.DataAnnotations;

namespace CleanBrightCompany.Models;

public class Goals
{
    [Key]
    public double cumulativeCF { private get; set; }
    public int goalDuration { private get; set; }
    public double targetCF { private get; set; }
    public DateTime startDate { private get; set; }
    public DateTime endDate { private get; set; }

    public Goals(double cumulativeCF, int goalDuration, double targetCF, DateTime startDate, DateTime endDate)
    {
        this.cumulativeCF = cumulativeCF;
        this.goalDuration = goalDuration;
        this.targetCF = targetCF;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}