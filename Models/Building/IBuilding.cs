namespace CleanBrightCompany.Models;

public interface IBuilding
{
    public void addLog(RoomUsage log);
    public void addRoom(Room room);
    public List<Room> getAllRooms();
    public List<RoomUsage>getMonthlyLogs(string roomID);
    public float calculateLevelUsage(int level);
    public float calculateRoomUsage(string roomID);
    public void inputUsage(float usage);
}