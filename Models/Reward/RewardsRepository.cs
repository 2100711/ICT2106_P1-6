// RewardsRepository.cs
using CleanBrightCompany.Data;
namespace CleanBrightCompany.Models
{
  public class RewardsRepository : IRewardsRepository
  {
    public IEnumerable<Reward> GetAllRewards()
    {
      var rewardGw = DatabaseHandle.GetReadHandle<Reward>();
      return rewardGw.GetAll().Cast<Reward>().ToList();
    }

    public Reward GetRewardById(int id)
    {
      var rewardGw = DatabaseHandle.GetReadHandle<Reward>();
      return rewardGw.Find(r => r.Id == id).FirstOrDefault();
    }


    public void CreateReward(Reward reward)
    {
      var rewardGw = DatabaseHandle.GetWriteHandle<Reward>();
      rewardGw.Create((Reward)reward);
    }

    public void UpdateReward(Reward reward)
    {
      var rewardGw = DatabaseHandle.GetWriteHandle<Reward>();
      rewardGw.Update((Reward)reward);
    }

    public void DeleteReward(Reward reward)
    {
      var rewardGw = DatabaseHandle.GetWriteHandle<Reward>();
      rewardGw.Delete(reward.GetId().ToString());
    }
  }
}
