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

        public void ChangeLokal(Lokal lok)
        {
            throw new NotImplementedException();
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