using Microsoft.AspNetCore.Mvc;
using WhereTo.DataLayer;
using WhereTo.Models;

namespace WhereTo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DogadjajController:ControllerBase
    {
        private IDogadjajRepo _repo;

        public DogadjajController(IDogadjajRepo repo)
        {
            _repo=repo;
        }


        [HttpGet("id/{id}", Name ="GetDogadjajById")]
        public ActionResult<Dogadjaj> GetDogadjajById(string id)
        {
            var dogadjaj= _repo.GetDogadjajById(id);

            if(dogadjaj!=null)
            {
                return Ok(dogadjaj);
            }

            return NotFound();
        }
        [HttpGet("tag/{tag}", Name ="GetAllDogadjajByTag")]
        public ActionResult<IEnumerable<Dogadjaj>> GetAllDogadjajByTag(string tag)
        {
            return Ok(_repo.GetAllDogadjaji(tag));
        }
        [HttpPut]
        public ActionResult<Dogadjaj> DodajTagDogadjaju(string idDogadjaja,string Tag)
        {
            var dogadjaj= _repo.GetDogadjajById(idDogadjaja);
            if(dogadjaj!=null)
            {
                if(dogadjaj.listaTagova!=null)
                {
                    int ponavljanjeTaga=0;
                    foreach(var el in dogadjaj.listaTagova)
                        if(String.Equals(el,Tag)==true)
                            ponavljanjeTaga++;
                    if(ponavljanjeTaga==0)
                        dogadjaj.listaTagova.Add(Tag);
                    _repo.CreateDogadjaj(dogadjaj);

                return Ok(dogadjaj);
                }
            }

            return NotFound();
        }
       [HttpDelete("id/{id}", Name ="DeleteDogadjaj")]
        public ActionResult<Dogadjaj> DeleteDogadjaj(string id)
        {
            var dogadjaj=_repo.GetDogadjajById(id);
            if(dogadjaj!=null)
            {
                if(dogadjaj.listaTagova!=null)
                {
                    _repo.DeleteDogadjaj(dogadjaj);
                
                }
            }
            return Ok(dogadjaj);
        }
        [HttpDelete("date/{date}", Name ="DeleteDogadjajByDate")]
        public ActionResult<Dogadjaj>? DeleteDogadjajByDate(string date)
        {
            DateTime vreme=DateTime.Parse(date);
            if(DateTime.Compare(DateTime.Now,vreme)<0)
            {
                var dogadjaji=_repo.GetAllDogadjaji(date);
                if(dogadjaji!=null)
                {
                    foreach(var dog in dogadjaji)
                        {   
                            if(dog!=null)
                                _repo.DeleteDogadjaj(dog);
                        }
                }
                return Ok(dogadjaji);
            }
            return null;
        }
        [HttpPost]
        public ActionResult<Dogadjaj> CreateDogadjaj(Dogadjaj dogadjaj)
        {
            if(dogadjaj.listaTagova!=null)
            {
                int ponavljanjeTaga=0;
                    foreach(var el in dogadjaj.listaTagova)
                        if(String.Equals(el,"Dogadjaj")==true)
                            ponavljanjeTaga++;
                if(ponavljanjeTaga==0)
                    dogadjaj.listaTagova.Add("Dogadjaj");
                _repo.CreateDogadjaj(dogadjaj);
            }
            //return CreatedAtRoute(nameof(GetDogadjajById), new {Id=dogadjaj.DogadjajID},dogadjaj);
            return Ok(dogadjaj);
        }

        
    }
}