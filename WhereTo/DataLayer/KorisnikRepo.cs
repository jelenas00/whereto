using System.Text.Json;
using StackExchange.Redis;
using WhereTo.Models;

namespace WhereTo.DataLayer
{
    public class KorisnikRepo: IKorisnikRepo
    {
        private IConnectionMultiplexer _redis;

        public KorisnikRepo(IConnectionMultiplexer redis)
        {
            _redis=redis;
        }


        public Korisnik? GetKorisnikById (string id)
        {
            var db = _redis.GetDatabase();
            var korisnik = db.HashGet("korisnikHes",id);

            if (!string.IsNullOrEmpty(korisnik))
            {
                return JsonSerializer.Deserialize<Korisnik>(korisnik);
            }

            return null;
        }

       
        public IEnumerable<Korisnik?>? GetAllKorisnici()
        {
            var db = _redis.GetDatabase();
            var korisnici = db.HashGetAll("korisnikHes");
            
            if (korisnici != null)
            {
                var listaK = Array.ConvertAll(korisnici, val=>JsonSerializer.Deserialize<Korisnik>(val.Value)).ToList();
                return listaK;
            }
            return null;
        }

        public void CreateKorisnik(Korisnik korisnik) {
            
            if (korisnik != null) 
            {
                var db = _redis.GetDatabase();
                var serialKor = JsonSerializer.Serialize(korisnik);
                db.HashSet("korisnikHes",new HashEntry[]{new HashEntry(korisnik.KorisnikID,serialKor)});
            }
        }

        public void DeleteKorisnik (string id)
        {
            var db = _redis.GetDatabase();
            
            if (!string.IsNullOrEmpty(id))
            {
                db.HashDelete("korisnikHes",id);
            }
        }

        public Korisnik? ChangeKorisnik(Korisnik korisnik)
        {
            var db= _redis.GetDatabase();
            if(korisnik!=null)
            {
                //var stari= db.HashGet("korisnikHes",korisnik.KorisnikID);
                Korisnik? novi= JsonSerializer.Deserialize<Korisnik>(db.HashGet("korisnikHes",korisnik.KorisnikID));
                //if(!stari.IsNullOrEmpty)
                if(novi!=null)
                {
                    //Korisnik novi= JsonSerializer.Deserialize<Korisnik>(stari);
                    novi.Name=korisnik.Name;
                    novi.LastName=korisnik.LastName;
                    novi.Email=korisnik.Email;
                    novi.Password=korisnik.Password;
                    novi.inbox=korisnik.inbox;
                    var upis= JsonSerializer.Serialize(novi);
                    db.HashSet("korisnikHes",new HashEntry[]{new HashEntry(novi.KorisnikID,upis)});
                    return novi;
                }
                return null;
            }
            return null;
        }
    }
}