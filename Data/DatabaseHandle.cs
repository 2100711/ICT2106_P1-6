using CleanBrightCompany.Models;
using Microsoft.EntityFrameworkCore;

namespace CleanBrightCompany.Data
{
  public static class DatabaseHandle
  {
    private const String CONNECT_STRING = "Data Source=CBCDBContext-090aae5d-4cab-4142-a5b6-ff97393be36a.db";

    public static CleanBrightCompanyDBContext GetDBContext()
    {
      var optionsBuilder = new DbContextOptionsBuilder<CleanBrightCompanyDBContext>().UseSqlite(CONNECT_STRING);
      return new CleanBrightCompanyDBContext(optionsBuilder.Options);
    }

    public static IReadDatabase<T> GetReadHandle<T>()
    {
      Type type = typeof(T);
      if (type == typeof(Product))
        return (IReadDatabase<T>)new GenericReadGateway<Product>();
      else if (type == typeof(Room))
        return (IReadDatabase<T>)new GenericReadGateway<Room>();
      else if (type == typeof(RoomUsage))
        return (IReadDatabase<T>)new GenericReadGateway<RoomUsage>();
      else if (type == typeof(Reward))
        return (IReadDatabase<T>)new GenericReadGateway<Reward>();
      else
        throw new Exception("No read gateway found for type " + type.Name);
    }

    public static IWriteDatabase<T, string> GetWriteHandle<T>()
    {
      Type type = typeof(T);
      if (type == typeof(Product))
        return (IWriteDatabase<T, string>)new GenericWriteGateway<Product>();
      else if (type == typeof(Room))
        return (IWriteDatabase<T, string>)new GenericWriteGateway<Room>();
      else if (type == typeof(RoomUsage))
        return (IWriteDatabase<T, string>)new GenericWriteGateway<RoomUsage>();
      else if (type == typeof(Reward))
        return (IWriteDatabase<T, string>)new GenericWriteGateway<Reward>();
      else
        throw new Exception("No write gateway found for type " + type.Name);
    }
  }
}