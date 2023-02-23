using System.ComponentModel.DataAnnotations;

namespace CleanBrightCompany.Models;

public class Room
{
    [Key]
    public string? roomID { get; set; }
    public int level { get; set; }
}