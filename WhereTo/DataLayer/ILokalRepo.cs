using WhereTo.Models;

namespace WhereTo.DataLayer
{
    public interface ILokalRepo
    {
        void CreateLokal(Lokal lok);
        Lokal? GetLokalById(string id);
        IEnumerable<Lokal?>? GetAllLokali();
        IEnumerable<Lokal?>? GetLokaliByTag(string tag);
        void DeleteLokal(string id);
        void ChangeLokal(Lokal lok);
        //dodavanje slike
    }
}