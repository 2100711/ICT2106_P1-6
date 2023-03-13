using CleanBrightCompany.Data;
using CleanBrightCompany.ViewModels;
using ICT2106_P1_4.Models.Goals;

namespace CleanBrightCompany.Models;

public class GoalsManagement : IGoalsManagement
{
    private static GoalsManagement? _instance;
    public static GoalsManagement Instance => _instance ?? (_instance = new GoalsManagement());
    private GoalsManagement() { }

    public void AddGoal(IGoals goal) 
    {
        var goalGw = DatabaseHandle.GetWriteHandle<Goals>();
        goalGw.Create((Goals)goal);
    }

    public void DeleteGoal(IGoals goal)
    {
        var goalGw = DatabaseHandle.GetWriteHandle<Goals>();
        goalGw.Delete(goal.goalID.ToString());
    }

    public void UpdateGoal(IGoals goal)
    {
        var goalGw = DatabaseHandle.GetWriteHandle<Goals>();
        goalGw.Update((Goals)goal);
    }

    public IEnumerable<IGoals> GetAllGoals()
    {
        var goalGw = DatabaseHandle.GetReadHandle<Goals>();
        return goalGw.GetAll().Cast<Goals>().ToList();
    }

    public IGoals GetLastGoal()
    {
        var goalGw = DatabaseHandle.GetReadHandle<Goals>();
        return goalGw.GetAll().Cast<Goals>().ToList().Last();
    }

    public IGoals? GetGoalById(int id)
    {
        var goalGw = DatabaseHandle.GetReadHandle<Goals>();
        return goalGw.Find(g => g.goalID == id).Cast<IGoals>().FirstOrDefault();
    }
}
