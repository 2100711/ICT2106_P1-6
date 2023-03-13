using CleanBrightCompany.Data;
using CleanBrightCompany.Models;

namespace ICT2106_P1_4.Models.Goals
{
    public interface IGoalsManagement
    {
        public void AddGoal(IGoals goal);
        public void DeleteGoal(IGoals goal);
        public void UpdateGoal(IGoals goal);
        public IEnumerable<IGoals> GetAllGoals();
        public IGoals GetLastGoal();
        public IGoals? GetGoalById(int id);
    }
}
