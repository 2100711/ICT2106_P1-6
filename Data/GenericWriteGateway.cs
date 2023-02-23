using Microsoft.EntityFrameworkCore;

namespace CleanBrightCompany.Data;

class GenericWriteGateway<T> : IWriteDatabase<T, string> where T : class
{
    protected CleanBrightCompanyDBContext _context;
    protected DbSet<T> _dbSet;

    public GenericWriteGateway()
    {
        _context = DatabaseHandle.GetDBContext();
        _dbSet = _context.Set<T>();
    }

    public virtual void Create(T data)
    {
        _dbSet.Add(data);
        _context.SaveChanges();
    }

    public virtual void Update(T data)
    {
        _dbSet.Update(data);
        _context.SaveChanges();
    }

    public virtual void Delete(string identifier)
    {
        T? p = _dbSet.Find(identifier);
        if (p == null) return;
        _dbSet.Remove(p);
        _context.SaveChanges();
    }
}