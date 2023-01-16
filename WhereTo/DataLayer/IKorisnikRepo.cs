using WhereTo.Models;

namespace WhereTo.DataLayer
{
    public interface IKorisnikRepo
    {
        Korisnik? GetKorisnikById (string id);
        IEnumerable<Korisnik?>? GetAllKorisnici();
        void CreateKorisnik (Korisnik korisnik);
        void DeleteKorisnik (string id);

        Korisnik? ChangeKorisnik(Korisnik korisnik);
        Korisnik? ChangeKorisnikLogInfo(string id,string mail,string pass);
        
    }
}