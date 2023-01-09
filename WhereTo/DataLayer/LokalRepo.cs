using System.Text.Json;
using StackExchange.Redis;
using WhereTo.Models;

namespace WhereTo.DataLayer
{
    public class LokalRepo: ILokalRepo
    {
        private IConnectionMultiplexer _redis;

        public LokalRepo(IConnectionMultiplexer redis)
        {
            _redis=redis;
        }

        public Lokal? ChangeLokal(Lokal lok)
        {
            var db= _redis.GetDatabase();
            if(lok!=null)
            {
                //var stari= db.HashGet("korisnikHes",korisnik.KorisnikID);
                Lokal? novi= JsonSerializer.Deserialize<Lokal>(db.HashGet("lokalihes",lok.LokalID));
                //if(!stari.IsNullOrEmpty)
                if(novi!=null)
                {
                    //Korisnik novi= JsonSerializer.Deserialize<Korisnik>(stari);
                    novi.Name=lok.Name;
                    novi.Opis=lok.Opis;
                    novi.RadnoVreme=lok.RadnoVreme;
                    novi.Lokacija=lok.Lokacija;
                    /*if(lok.Tagovi!=null)
                    {
                        foreach(string el in lok.Tagovi)
                            novi.Tagovi.Add(el);
                    }
                    else novi.Tagovi=null;
                    if(lok.Dogadjaji!=null)
                    {
                        foreach(Dogadjaj el in lok.Dogadjaji)
                            novi.Dogadjaji.Add(el);
                    }
                    else
                        novi.Dogadjaji=null;*/
                    novi.Tagovi=lok.Tagovi;
                    novi.Dogadjaji=lok.Dogadjaji;
                    var upis= JsonSerializer.Serialize(novi);
                    db.HashSet("lokalihes",new HashEntry[]{new HashEntry(novi.LokalID,upis)});
                    return novi;
                }
                return null;
            }
            return null;
        }

        public void CreateLokal(Lokal lok)
        {
            if(lok!=null)
            {
                var db= _redis.GetDatabase();
                var serialLok= JsonSerializer.Serialize(lok);
                if(lok.Tagovi!=null)
                {
                    foreach(string el in lok.Tagovi)
                        db.HashSet(el, new HashEntry[]{new HashEntry(lok.LokalID,serialLok)});
                }
                db.HashSet("lokalihes", new HashEntry[]{new HashEntry(lok.LokalID,serialLok)});
                //db.StringSet(lok.LokalID,serialLok);
            }
        }

        public void DeleteLokal(string id)
        {
            var db=_redis.GetDatabase();
            if(!string.IsNullOrEmpty(id))
            {
                db.HashDelete("lokalihes",id);
            }
        }

        public IEnumerable<Lokal?>? GetAllLokali()
        {
            var db= _redis.GetDatabase();
            var lokali= db.HashGetAll("lokalihes");
            if(lokali!=null)
            {
                var lista= Array.ConvertAll(lokali, val=>JsonSerializer.Deserialize<Lokal>(val.Value)).ToList();
                return lista;
            }
            return null;
        }

        public Lokal? GetLokalById(string id)
        {
            if(string.IsNullOrEmpty(id))
            {
                return null;
            }
            var db=_redis.GetDatabase();
            var lok= db./*StringGet(id);*/HashGet("lokalihes",id);
            if(!string.IsNullOrEmpty(lok))
            {
                return JsonSerializer.Deserialize<Lokal>(lok);
            }
            return null;
        }

        public IEnumerable<Lokal?>? GetLokaliByTag(string tag)
        {
            throw new NotImplementedException();
        }

    }
}