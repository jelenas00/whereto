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

        public Dogadjaj? ChangeDogadjaj(Dogadjaj dog)
        {
            var db= _redis.GetDatabase();
            if(db!=null)
            {
                Dogadjaj? izmena= GetDogadjajById(dog.DogadjajID);
                if(izmena!=null)
                {
                    izmena.Datum=dog.Datum;
                    izmena.Name=dog.Name;
                    izmena.Organizator=dog.Organizator;
                    izmena.listaTagova=dog.listaTagova;
                    izmena.Korisnici=dog.Korisnici;
                    var upis= JsonSerializer.Serialize(izmena);
                    if(izmena.listaTagova!=null)
                    {
                        foreach(var tag in izmena.listaTagova)
                        {
                            db.HashSet(tag,new HashEntry[]{new HashEntry(izmena.DogadjajID,upis)});
                        }
                    }
                    db.HashSet(izmena.Datum,new HashEntry[]{new HashEntry(izmena.DogadjajID,upis)});
                    return izmena;
                }
                else return null;
            }
            else return null;
        }

        public Dogadjaj? CreateDogadjaj(Dogadjaj dog)
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
                return dog;
            }
            return null;
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

            var dog=db.HashGet("Dogadjaj",id);

            if(!string.IsNullOrEmpty(dog))
            {
                return JsonSerializer.Deserialize<Dogadjaj>(dog);
            }

            return null;
        }
    }
}