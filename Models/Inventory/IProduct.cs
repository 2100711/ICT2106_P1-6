namespace CleanBrightCompany.Models
{
    public interface IProduct
    {
        public void AddProduct(IProductItem product);
        public void AddProduct(IEnumerable<IProductItem> products);
        public void DeleteProduct(IProductItem product);
        public List<IProductItem> GetAllProducts();
        public IProductItem? GetProductById(int productID);
        public List<IProductItem> Search(Func<IProductItem, bool> filter);
    }
}