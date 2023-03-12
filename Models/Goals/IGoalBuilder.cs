using CleanBrightCompany.Models;

public interface IGoalBuilder
{
    public IGoalBuilder CreateGoal();
    public IGoalBuilder BuildGoalStartingPoint(double cumulativeCF);
    public IGoalBuilder BuildGoalTarget(double targetCF);
    public IGoalBuilder BuildGoalDuration(int goalDuration);
    public IGoalBuilder BuildGoalDate(DateTime startDate, DateTime endDate);
    public IGoals GetGoal();
}
