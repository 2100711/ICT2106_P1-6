using CleanBrightCompany.Data;
using CleanBrightCompany.Models;
using Microsoft.AspNetCore.Mvc;

namespace CleanBrightCompany.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BuildingController : ControllerBase
{
    private readonly ILogger<BuildingController> _logger;

    public BuildingController(ILogger<BuildingController> logger)
    {
        _logger = logger;
        _logger.LogInformation("Inside BuildingController");
    }

    // Get all room details
    [HttpGet]
    [Route("room")]
    public ActionResult<IEnumerable<Room>> GetRooms()
    {
        IBuilding building = new BuildingUsageController();
        List<Room> rooms = building.getAllRooms().Cast<Room>().ToList();
        return Ok(rooms);
    }

    // Get all log details for specific year + month
    [HttpGet]
    [Route("log/{roomID}")]
    public ActionResult<IEnumerable<Room>> GetLog(string roomID)
    {
        IBuilding building = new BuildingUsageController();
        List<RoomUsage> logs = building.getMonthlyLogs(roomID).Cast<RoomUsage>().ToList();
        return Ok(logs);
    }

    // Create new log
    [HttpPost]
    [Route("log/create/{pk}/{roomID}/{logDate}/{carbonFootprintEmission}/{electricityUsage}")]
    public IActionResult CreateLog(string pk, string roomID, DateOnly logDate, float carbonFootprintEmission, float electricityUsage)
    {
        IBuilding building = new BuildingUsageController();
        RoomUsage log = new RoomUsage { roomUsageID = pk, electricityUsage = electricityUsage, logDate = logDate, carbonFootprintEmission = carbonFootprintEmission, roomID = roomID };
        building.addLog(log);
        return Ok();
    }

    // Create new room - used to populate data
    [HttpPost]
    [Route("room/create/{roomID}/{level}")]
    public IActionResult CreateRoom(string roomID, int level)
    {
        IBuilding building = new BuildingUsageController();
        Room newRoom = new Room { roomID = roomID, level = level };
        building.addRoom(newRoom);
        _logger.LogInformation("add new room");
        return Ok();
    }
}