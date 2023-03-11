using Microsoft.AspNetCore.Server.IIS.Core;
using System.ComponentModel.DataAnnotations;
namespace CleanBrightCompany.Models;

public class Goals : IGoals
{
    [Key]
    public int goalID { get; private set; }

    [Required]
    public double cumulativeCF { get; private set; }

    [Required]
    public double targetCF { get; private set; }

    [Required]
    public int goalDuration { get; private set; }

    [Required]
    public DateTime startDate { get; private set; }

    [Required]
    public DateTime endDate { get; private set; }

    public Goals() 
    {
        this.goalID = 0;
        this.cumulativeCF = 0;
        this.targetCF = 0;
        this.goalDuration = 0;
        this.startDate = DateTime.MinValue;
        this.endDate = DateTime.MinValue;
    }

    public Goals(int goalID, double cumulativeCF, double targetCF, int goalDuration, DateTime startDate, DateTime endDate)
    {
        this.goalID = goalID;
        this.cumulativeCF = cumulativeCF;
        this.targetCF = targetCF;
        this.goalDuration = goalDuration;
        this.startDate = startDate.Date;
        this.endDate = endDate.Date;
    }

    public void UpdateCumulativeCF (double cumulativeCF)
    {
        this.cumulativeCF = cumulativeCF;
    }

    public void UpdateTargetCF(double targetCF)
    {
        this.targetCF = targetCF;
    }

    public void UpdateGoalDuration(int goalDuration)
    {
        this.goalDuration = goalDuration;
    }

    public void UpdateDate (DateTime startDate, DateTime endDate)
    {
        this.startDate = startDate.Date;
        this.endDate = endDate.Date;
    }
}