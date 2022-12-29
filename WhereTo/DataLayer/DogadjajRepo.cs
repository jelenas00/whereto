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
                db.HashSet("dogadjajhash", new HashEntry[]{new HashEntry (dog.DogadjajID,serialDog)});
                
            }
        }

        public IEnumerable<Dogadjaj?>? GetAllDogadjaji()
        {
            var db=_redis.GetDatabase();
            var allHash=db.HashGetAll("dogadjajhash");
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

            var dog=db.HashGet("dogadjajhash",id);

            if(!string.IsNullOrEmpty(dog))
            {
                return JsonSerializer.Deserialize<Dogadjaj>(dog);
            }

            return null;
        }
    }
}