namespace CleanBrightCompany.Models;

public class RewardService : IRewardService
{
    private readonly IRewardRepository _repository;

    public RewardService(IRewardRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Reward>> GetAllRewards()
    {
        return await _repository.GetAllRewards();
    }

    public async Task<Reward> GetRewardById(int id)
    {
        return await _repository.GetRewardById(id);
    }

    public async Task AddReward(Reward reward)
    {
        await _repository.AddReward(reward);
    }

    public async Task UpdateReward(Reward reward)
    {
        await _repository.UpdateReward(reward);
    }

    public async Task DeleteReward(int id)
    {
        await _repository.DeleteReward(id);
    }

    public async Task<IEnumerable<Reward>> SearchRewards(string searchTerm)
    {
        return await _repository.SearchRewards(searchTerm);
    }
}
