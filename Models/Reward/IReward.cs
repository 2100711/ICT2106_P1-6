// IReward.cs
namespace CleanBrightCompany.Models {
public interface IReward
{
    public int GetId();

    public void SetId(int id);

    public string GetName();

    public void SetName(string name);

    public string GetDescription();

    public void SetDescription(string description);

    public int GetPointValue();

    public void SetPointValue(int pointValue);
}
}
