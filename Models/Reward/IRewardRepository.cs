namespace CleanBrightCompany.Models;

public interface IRewardRepository
{
    Task<IEnumerable<Reward>> GetAllRewards();
    Task<Reward> GetRewardById(int id);
    Task AddReward(Reward reward);
    Task UpdateReward(Reward reward);
    Task DeleteReward(int id);
    Task<IEnumerable<Reward>> SearchRewards(string searchTerm);
}
