namespace CleanBrightCompany.Models;

public class Email
{
    public string? subject { get; private set; }
    public string[]? recipients { get; private set; }
    public string? body { get; private set; }
}