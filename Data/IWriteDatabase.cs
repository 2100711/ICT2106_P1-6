namespace CleanBrightCompany.Data;

public interface IWriteDatabase<T1, T2>
{
    public void Create(T1 data);
    public void Update(T1 data);
    public void Delete(T2 identifier);
}