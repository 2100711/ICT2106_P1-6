// RewardService.cs
namespace CleanBrightCompany.Models
{
  public class RewardService : IRewardService
  {
    private readonly IRewardsRepository _repository;

    public RewardService(IRewardsRepository repository)
    {
      _repository = repository;
    }

    public IEnumerable<Reward> GetAllRewards()
    {
      return _repository.GetAllRewards();
    }

    public Reward GetRewardById(int id)
    {
      return _repository.GetRewardById(id);
    }

    public void CreateReward(Reward reward)
    {
      _repository.CreateReward(reward);
    }

    public void UpdateReward(Reward reward)
    {
      _repository.UpdateReward(reward);
    }

    public void DeleteReward(Reward reward)
    {
      _repository.DeleteReward(reward);
    }
  }
}