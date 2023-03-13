using System.ComponentModel.DataAnnotations;

namespace CleanBrightCompany.Models;

public class Goals : IGoals
{
    [Key]
    public int goalID { get; set; }
    [Required]
    public double cumulativeCF { get; set; }
    [Required]
    public double targetCF { get; set; }
    [Required]
    public int goalDuration { get; set; }
    [Required]
    public DateTime startDate { get; set; }
    [Required]
    public DateTime endDate { get; set; }
    [Required]
    public double progress { get; set; }
}