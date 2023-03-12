using CleanBrightCompany.Models;

public class GoalBuilder : IGoalBuilder
{
    private const String GOAL_NOT_CREATED = "Goal not created.";
    private IGoals? goal;

    public static IGoalBuilder Build()
    {
        return new GoalBuilder();
    }

    public IGoalBuilder BuildGoalDate(DateTime startDate, DateTime endDate)
    {
        if (this.goal == null)
        {
            throw new NullReferenceException(GOAL_NOT_CREATED);
        }
        Goals goal = (Goals)this.goal;
        goal.UpdateDate(startDate, endDate);
        return this;
    }

    public IGoalBuilder BuildGoalDuration(int goalDuration)
    {
        if (this.goal == null)
        {
            throw new NullReferenceException(GOAL_NOT_CREATED);
        }
        Goals goal = (Goals)this.goal;
        goal.UpdateGoalDuration(goalDuration);
        return this;
    }

    public IGoalBuilder BuildGoalStartingPoint(double cumulativeCF)
    {
        if (this.goal == null)
        {
            throw new NullReferenceException(GOAL_NOT_CREATED);
        }
        Goals goal = (Goals)this.goal;
        goal.UpdateCumulativeCF(cumulativeCF);
        return this;
    }

    public IGoalBuilder BuildGoalTarget(double targetCF)
    {
        if (this.goal == null)
        {
            throw new NullReferenceException(GOAL_NOT_CREATED);
        }
        Goals goal = (Goals)this.goal;
        goal.UpdateTargetCF(targetCF);
        return this;
    }

    public IGoalBuilder CreateGoal()
    {
        goal = new Goals();
        return this;
    }

    public IGoals GetGoal()
    {
        if (this.goal == null)
        {
            throw new NullReferenceException(GOAL_NOT_CREATED);
        }
        return this.goal;
    }

}
