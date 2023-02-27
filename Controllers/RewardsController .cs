using Microsoft.AspNetCore.Mvc;
using CleanBrightCompany.DTOs;
using CleanBrightCompany.Models;
namespace CleanBrightCompany.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RewardsController : ControllerBase
{
    private readonly IRewardService _service;

    public RewardsController(IRewardService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RewardDto>>> GetRewards()
    {
        var rewards = await _service.GetAllRewards();

        var rewardDtos = rewards.Select(r => new RewardDto
        {
            Id = r.Id,
            Name = r.Name,
            Description = r.Description,
            PointCost = r.PointCost,
            ImageUrl = r.ImageUrl
        });

        return Ok(rewardDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RewardDto>> GetReward(int id)
    {
        var reward = await _service.GetRewardById(id);

        if (reward == null)
        {
            return NotFound();
        }

        var rewardDto = new RewardDto
        {
            Id = reward.Id,
            Name = reward.Name,
            Description = reward.Description,
            PointCost = reward.PointCost,
            ImageUrl = reward.ImageUrl
        };

        return Ok(rewardDto);
    }

    [HttpPost]
    public async Task<ActionResult> CreateReward([FromBody] RewardDto rewardDto)
    {
        if (rewardDto == null)
        {
            return BadRequest();
        }

        var reward = new Reward
        {
            Name = rewardDto.Name,
            Description = rewardDto.Description,
            PointCost = rewardDto.PointCost,
            ImageUrl = rewardDto.ImageUrl
        };

        await _service.AddReward(reward);

        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateReward(int id, [FromBody] RewardDto rewardDto)
    {
        if (rewardDto == null)
        {
            return BadRequest();
        }

        var reward = await _service.GetRewardById(id);

        if (reward == null)
        {
            return NotFound();
        }

        reward.Name = rewardDto.Name;
        reward.Description = rewardDto.Description;
        reward.PointCost = rewardDto.PointCost;
        reward.ImageUrl = rewardDto.ImageUrl;

        await _service.UpdateReward(reward);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteReward(int id)
    {
        var reward = await _service.GetRewardById(id);

        if (reward == null)
        {
            return NotFound();
        }

        await _service.DeleteReward(id);

        return Ok();
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<RewardDto>>> SearchRewards(string searchTerm)
    {
        var rewards = await _service.SearchRewards(searchTerm);

        var rewardDtos = rewards.Select(r => new RewardDto
        {
            Id = r.Id,
            Name = r.Name,
            Description = r.Description,
            PointCost = r.PointCost,
            ImageUrl = r.ImageUrl
        });

        return Ok(rewardDtos);
    }
}
