using WhereTo.Models;

namespace WhereTo.DataLayer
{
    public interface ILokalRepo
    {
        Lokal? CreateLokal(Lokal lok);
        Lokal? GetLokalById(string id);
        IEnumerable<Lokal?>? GetAllLokali();
        IEnumerable<Lokal?>? GetLokaliByTag(string tag);
        void DeleteLokal(string id);
        Lokal? ChangeLokal(Lokal lok);
        Lokal? ChangeLokalLogInfo(string id,string mail,string pass);
        //dodavanje slike
    }
}