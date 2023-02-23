using System.ComponentModel.DataAnnotations;

namespace CleanBrightCompany.Models;

public class RoomUsage
{
    [Key]
    public string? roomUsageID { get; set; }
    public float electricityUsage { get; set; }
    public DateOnly logDate { get; set; }
    public float carbonFootprintEmission { get; set; }
    public string? roomID { get; set; }
}