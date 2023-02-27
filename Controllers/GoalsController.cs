using Microsoft.AspNetCore.Mvc;
using CleanBrightCompany.DTOs;
using CleanBrightCompany.Models;
namespace CleanBrightCompany.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GoalsController : ControllerBase
{
    private readonly IGoals _service;

    public GoalsController(IGoals service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult getOrderHistory()
    {
        // TODO: implement
        return Ok();
    }

    [HttpGet]
    public IActionResult getGoalsHistory()
    {
        // TODO: implement
        return Ok();
    }

    [HttpPost]
    public IActionResult calculateGoalProgress(double cumulativeCF, double targetCF)
    {
        // TODO: implement
        return Ok();
    }

    [HttpPost]
    public IActionResult checkGoalComplete()
    {
        // TODO: implement
        return Ok();
    }

    [HttpPost]
    public IActionResult setTarget(double targetCF, int goalDuration)
    {
        // TODO: implement
        return Ok();
    }

    [HttpPost]
    public IActionResult sendNotification()
    {
        // TODO: implement
        return Ok();
    }
}
