// Reward.cs
using System.ComponentModel.DataAnnotations;
namespace CleanBrightCompany.Models
{
  public class Reward : IReward
  {
    private int _id;
    private string _name = string.Empty;
    private string _description = string.Empty;
    private int _pointValue = 0;

    [Key]
    public int Id
    {
      get => GetId();
      set => SetId(value);
    }

    public string Name
    {
      get => GetName();
      set => SetName(value);
    }

    public string Description
    {
      get => GetDescription();
      set => SetDescription(value);
    }

    public int PointValue
    {
      get => GetPointValue();
      set => SetPointValue(value);
    }

    public Reward() { }

    public Reward(int id, string name, string description, int pointValue)
    {
      SetId(id);
      SetName(name);
      SetDescription(description);
      SetPointValue(pointValue);
    }

    public int GetId()
    {
      return _id;
    }

    public void SetId(int id)
    {
      if (id < 0)
      {
        throw new ArgumentException("Reward id cannot be negative.");
      }

      _id = id;
    }

    public string GetName()
    {
      return _name;
    }

    public void SetName(string name)
    {
      if (string.IsNullOrWhiteSpace(name))
      {
        throw new ArgumentException("Reward name cannot be null or empty.");
      }

      _name = name.Trim();
    }

    public string GetDescription()
    {
      return _description;
    }

    public void SetDescription(string description)
    {
      if (string.IsNullOrWhiteSpace(description))
      {
        throw new ArgumentException("Reward description cannot be null or empty.");
      }

      _description = description.Trim();
    }

    public int GetPointValue()
    {
      return _pointValue;
    }

    public void SetPointValue(int pointValue)
    {
      if (pointValue < 0)
      {
        throw new ArgumentException("Reward point value cannot be negative.");
      }

      _pointValue = pointValue;
    }
  }
}
