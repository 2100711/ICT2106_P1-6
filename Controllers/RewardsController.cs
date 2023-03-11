using Microsoft.AspNetCore.Mvc;
using CleanBrightCompany.Models;
// RewardsController.cs
namespace CleanBrightCompany.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class RewardsController : ControllerBase
  {
    private readonly IRewardService _rewardService;

    public RewardsController()
    {
      _rewardService = new RewardService(new RewardsRepository());
    }

    [HttpGet]
    public ActionResult<IEnumerable<Reward>> GetAllRewards()
    {
      var rewards = _rewardService.GetAllRewards();
      return Ok(rewards);
    }

    [HttpGet("{id}")]
    public ActionResult<Reward> GetRewardById(int id)
    {
      var reward = _rewardService.GetRewardById(id);

      if (reward == null)
      {
        return NotFound();
      }

      return Ok(reward);
    }

    [HttpPost]
    public ActionResult<IEnumerable<Reward>> CreateReward([FromBody] Reward reward)
    {
      if (reward == null)
      {
        return BadRequest();
      }

      try
      {
        _rewardService.CreateReward(reward);
        return Ok(reward);
      }
      catch (ArgumentException ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPut("{id}")]
    public ActionResult<IEnumerable<Reward>> UpdateReward(int id, [FromBody] Reward reward)
    {
      if (reward == null || id != reward.GetId())
      {
        return BadRequest();
      }

      try
      {
        _rewardService.UpdateReward(reward);
        return Ok(reward);
      }
      catch (ArgumentException ex)
      {
        return BadRequest(ex.Message);
      }
    }

      // [HttpDelete("{id}")]
      // public ActionResult<IEnumerable<Reward>> DeleteReward(Reward reward)
      // {
      //   try
      //   {
      //     _rewardService.DeleteReward(reward);
      //     return Ok(reward);
      //   }
      //   catch (ArgumentException ex)
      //   {
      //     return NotFound(ex.Message);
      //   }
      // }
      [HttpDelete("{id}")]
public ActionResult DeleteReward(int id)
{
  try
  {
    var reward = _rewardService.GetRewardById(id);
    if (reward == null)
    {
      return NotFound($"Reward with ID {id} not found");
    }

    _rewardService.DeleteReward(reward);
    return Ok(reward);
  }
  catch (ArgumentException ex)
  {
    return NotFound(ex.Message);
  }
}

  }
}