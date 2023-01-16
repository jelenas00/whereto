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
                
                Lokal? novi= JsonSerializer.Deserialize<Lokal>(db.HashGet("lokalihes",lok.LokalID));
                if(novi!=null)
                {
                    novi.Name=lok.Name;
                    novi.Opis=lok.Opis;
                    novi.RadnoVreme=lok.RadnoVreme;
                    novi.Lokacija=lok.Lokacija;
                    novi.Tagovi=lok.Tagovi;
                    novi.Dogadjaji=lok.Dogadjaji;
                    var upis= JsonSerializer.Serialize(novi);
                    if(novi.Tagovi!=null)
                        foreach(var tag in novi.Tagovi)
                            db.HashSet(tag,new HashEntry[]{new HashEntry(novi.LokalID,upis)});
                    db.HashSet("lokalihes",new HashEntry[]{new HashEntry(novi.LokalID,upis)});
                    return novi;
                }
                return null;
            }
            return null;
        }
        public Lokal? ChangeLokalLogInfo(string id,string mail,string pass)
        {
            var db= _redis.GetDatabase();
                Lokal? novi= JsonSerializer.Deserialize<Lokal>(db.HashGet("lokalihes",id));
                if(novi!=null)
                {
                    novi.Email=mail;
                    novi.Password=pass;
                    var upis= JsonSerializer.Serialize(novi);
                    if(novi.Tagovi!=null)
                        foreach(var tag in novi.Tagovi)
                            db.HashSet(tag,new HashEntry[]{new HashEntry(novi.LokalID,upis)});
                    db.HashSet("lokalihes",new HashEntry[]{new HashEntry(novi.LokalID,upis)});
                    return novi;
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
            }
            else{
                throw new ArgumentOutOfRangeException(nameof(lok));
            }
        }

        public void DeleteLokal(string id)
        {
            var db=_redis.GetDatabase();
            if(!string.IsNullOrEmpty(id))
            {
                var lok=GetLokalById(id);
                if(lok!=null)
                    if(lok.Tagovi!=null)
                        foreach(string el in lok.Tagovi)
                            db.HashDelete(el,lok.LokalID);
                
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
            var db= _redis.GetDatabase();
            var lokali= db.HashGetAll(tag);
            if(lokali!=null)
            {
                var lista= Array.ConvertAll(lokali, val=>JsonSerializer.Deserialize<Lokal>(val.Value)).ToList();
                return lista;
            }
            return null;
        }

    }
}