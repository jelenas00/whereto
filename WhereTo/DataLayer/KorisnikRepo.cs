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

       
        public IEnumerable<Korsnik?>? GetAllKorisnici()
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
            }

            // .... ....
        }

        public void DeleteKorisnik (string id)
        {
            var db = _redis.GetDatabase();
            
            if (!string.IsNullOrEmpty(id))
            {
                db.HashDelete("korisnikHes",id);
            }
        }

        
    }
}