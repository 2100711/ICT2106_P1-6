// RewardViewModel.cs
using System.Collections.ObjectModel;
using CleanBrightCompany.Models;
using Prism.Mvvm;
namespace CleanBrightCompany.ViewModels
{
  public class RewardViewModel : BindableBase
  {
    private readonly IRewardService _service;
    private ObservableCollection<Reward> _rewards;

    public ObservableCollection<Reward> Rewards
    {
      get { return _rewards; }
      set { SetProperty(ref _rewards, value); }
    }

    public RewardViewModel(IRewardService service)
    {
      _service = service;
      Rewards = new ObservableCollection<Reward>(_service.GetAllRewards());
    }

    public void CreateReward(Reward reward)
    {
      _service.CreateReward(reward);
      Rewards.Add(reward);
    }

    public void UpdateReward(Reward reward)
    {
      _service.UpdateReward(reward);
    }

    public void DeleteReward(Reward reward)
    {
      _service.DeleteReward(reward);
      Rewards.Remove(reward);
    }
  }
}