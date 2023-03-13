// RewardsViewModel.cs
using System.Collections.ObjectModel;
using Prism.Mvvm;
using CleanBrightCompany.Models;
namespace CleanBrightCompany.ViewModels
{
  public class RewardsViewModel : BindableBase
  {
    private readonly IRewardsRepository _repository;
    private ObservableCollection<Reward> _rewards;

    public ObservableCollection<Reward> Rewards
    {
      get { return _rewards; }
      set { SetProperty(ref _rewards, value); }
    }

    public RewardsViewModel(IRewardsRepository repository)
    {
      _repository = repository;
      Rewards = new ObservableCollection<Reward>(_repository.GetAllRewards());
    }

    public void CreateReward(Reward reward)
    {
      _repository.CreateReward(reward);
      Rewards.Add(reward);
    }

    public void UpdateReward(Reward reward)
    {
      _repository.UpdateReward(reward);
    }

    public void DeleteReward(Reward reward)
    {
      _repository.DeleteReward(reward);
      Rewards.Remove(reward);
    }
  }
}