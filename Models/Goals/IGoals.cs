namespace CleanBrightCompany.Models
{
    public interface IGoals
    {
        //public List<IOrders> getOrderHistory();
        public List<Goals> getGoalsHistory();
        public double calculateGoalProgress(double cumulativeCF, double targetCF);
        public bool checkGoalComplete();
        public void setTarget(double targetCF, int goalDuration);
        public void sendNotification();
    }
}