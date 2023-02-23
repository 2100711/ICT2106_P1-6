using System.Linq.Expressions;

namespace CleanBrightCompany.Data;

public interface IReadDatabase<T1>
{
    public IEnumerable<T1> GetAll();
    public IEnumerable<T1> Find(Expression<Func<T1, bool>> predicate);
}