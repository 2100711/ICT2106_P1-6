namespace CleanBrightCompany.Models;

public interface IEmailService
{
    public void sendEmail(string[] recipients, string subject, string body);
}