using CleanBrightCompany.Data;

namespace CleanBrightCompany.Models;

public class BuildingUsageController : IBuilding
{
    public void addLog(RoomUsage log)
    {
        var roomUsageGw = DatabaseHandle.GetWriteHandle<RoomUsage>();
        roomUsageGw.Create(log);
    }

    public void addRoom(Room room)
    {
        var roomGw = DatabaseHandle.GetWriteHandle<Room>();
        roomGw.Create(room);
    }

    public List<Room> getAllRooms()
    {
        var roomGw = DatabaseHandle.GetReadHandle<Room>();
        return roomGw.GetAll().ToList();
    }

    public List<RoomUsage> getMonthlyLogs(string roomID)
    {
        var roomUsageGw = DatabaseHandle.GetReadHandle<RoomUsage>();
        var newList = roomUsageGw.GetAll().ToList();
        var returnList = new List<RoomUsage>();
        if (newList != null)
        {
            for (int i = 0; i < newList.ToArray().Length; i++)
            {
                if (newList[i].roomID == roomID)
                {
                    returnList.Add(newList[i]);
                }
            }
        }
        return returnList;
    }

    public float calculateLevelUsage(int level)
    {
        return 0.0F;
    }

    public float calculateRoomUsage(string roomID)
    {
        return 0.0F;
    }

    public void inputUsage(float usage)
    {
    }
}
