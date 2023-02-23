namespace CleanBrightCompany.Models;

public interface ICarbonFootprint
{
    public float calculateProductCF(float volume, float toxicPercent)
    {
        return 0.0F;
    }

    public float calculateShipmentCF(string address, string shipmentType)
    {
        return 0.0F;
    }

    public float calculateBuildingCF(float electricityUsage)
    {
        return 0.0F;
    }

    public float calculateStaffCF(string staffID)
    {
        return 0.0F;
    }
}