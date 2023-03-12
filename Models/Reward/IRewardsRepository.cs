// IRewardsRepository.cs
namespace CleanBrightCompany.Models
{
  public interface IRewardsRepository
  {
    IEnumerable<Reward> GetAllRewards();

    Reward GetRewardById(int id);

    void CreateReward(Reward reward);

    void UpdateReward(Reward reward);

    void DeleteReward(Reward reward);
  }
}