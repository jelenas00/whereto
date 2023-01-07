using System.Text.Json;
using StackExchange.Redis;
using WhereTo.Models;

namespace WhereTo.DataLayer
{
    public class DogadjajRepo : IDogadjajRepo
    {
        private IConnectionMultiplexer _redis;

        public DogadjajRepo(IConnectionMultiplexer redis)
        {
            _redis=redis;
        }
        public void CreateDogadjaj(Dogadjaj dog)
        {
            if(dog!=null)
            {
                var db= _redis.GetDatabase();
                var serialDog=JsonSerializer.Serialize(dog);
                if(dog.listaTagova!=null)
                {
                    foreach(string el in dog.listaTagova)
                        db.HashSet(el, new HashEntry[]{new HashEntry (dog.DogadjajID,serialDog)});
                }
                db.HashSet(dog.Datum, new HashEntry[]{new HashEntry (dog.DogadjajID,serialDog)});
            }
        }

        

        public void DeleteDogadjaj(Dogadjaj dog)
        {
            var db =_redis.GetDatabase();
            if(dog.listaTagova!=null)
                {
                    foreach(string el in dog.listaTagova)
                        db.HashDelete(el,dog.DogadjajID);
                }
            db.HashDelete(dog.Datum,dog.DogadjajID);
            
            
        }
        public IEnumerable<Dogadjaj?>? GetAllDogadjaji(string tag)
        {
            var db=_redis.GetDatabase();
            var allHash=db.HashGetAll(tag);
            if(allHash.Length>0)
            {
                var obj=Array.ConvertAll(allHash,val=>JsonSerializer.Deserialize<Dogadjaj>(val.Value)).ToList();
                return obj;
            }

            return null;
        }

        public Dogadjaj? GetDogadjajById(string id)
        {
            var db=_redis.GetDatabase();
            //var plat= db.StringGet(id);

            var dog=db.HashGet("Dogadjaj",id);

            if(!string.IsNullOrEmpty(dog))
            {
                return JsonSerializer.Deserialize<Dogadjaj>(dog);
            }

            return null;
        }
    }
}