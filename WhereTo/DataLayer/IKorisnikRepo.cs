using WhereTo.Models;

namespace WhereTo.DataLayer
{
    public interface IKorisnikRepo
    {
        Korisnik? GetKorisnikById (string id);
        IEnumerable<Korisnik?>? GetAllKorisnici();
        void CreateKorisnik (Korisnik korisnik);
        void DeleteKorisnik (string id);
        
    }
}