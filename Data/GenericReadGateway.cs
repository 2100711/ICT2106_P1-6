using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace CleanBrightCompany.Data;

class GenericReadGateway<T> : IReadDatabase<T> where T : class
{
    protected CleanBrightCompanyDBContext _context;
    protected DbSet<T> _dbSet;

    public GenericReadGateway()
    {
        _context = DatabaseHandle.GetDBContext();
        _dbSet = _context.Set<T>();
    }

    public virtual IEnumerable<T> GetAll()
    {
        return _dbSet.ToList();
    }

    public virtual IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
    {
        return _dbSet.Where(predicate);
    }
}