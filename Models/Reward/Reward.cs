namespace CleanBrightCompany.Models;

public class Reward
{
    private string _name = string.Empty;
    private string _description = string.Empty;
    private int _pointCost;
    private DateTime _startDate;
    private DateTime _endDate;
    private bool _isActive;
    private string _imageUrl = string.Empty;

    public int Id { get; set; }

    public string Name
    {
        get { return _name; }
        set
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException("Name cannot be null or empty.");
            }

            _name = value;
        }
    }

    public string Description
    {
        get { return _description; }
        set
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException("Description cannot be null or empty.");
            }

            _description = value;
        }
    }

    public int PointCost
    {
        get { return _pointCost; }
        set
        {
            if (value < 0)
            {
                throw new ArgumentException("Point cost cannot be negative.");
            }

            _pointCost = value;
        }
    }

    public DateTime StartDate
    {
        get { return _startDate; }
        set
        {
            if (value > EndDate)
            {
                throw new ArgumentException("Start date cannot be after end date.");
            }

            _startDate = value;
        }
    }

    public DateTime EndDate
    {
        get { return _endDate; }
        set
        {
            if (value < StartDate)
            {
                throw new ArgumentException("End date cannot be before start date.");
            }

            _endDate = value;
        }
    }

    public bool IsActive
    {
        get { return _isActive; }
        set { _isActive = value; }
    }

    public string ImageUrl
    {
        get { return _imageUrl; }
        set
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException("Image URL cannot be null or empty.");
            }

            _imageUrl = value;
        }
    }
}
