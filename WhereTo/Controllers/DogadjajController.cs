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
        private IKorisnikRepo _korrepo;
        private ILokalRepo _lokrepo;

        public DogadjajController(IDogadjajRepo repo,IKorisnikRepo korrepo,ILokalRepo lokrepo)
        {
            _repo=repo;
            _korrepo=korrepo;
            _lokrepo=lokrepo;
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
                    if(dogadjaj.Organizator!=null)
                        {
                            if(dogadjaj.Organizator.Dogadjaji!=null)
                            {
                                dogadjaj.Organizator.Dogadjaji.Remove(dogadjaj.Organizator.Dogadjaji.Where(p=>p?.DogadjajID==dogadjaj.DogadjajID).First());
                                dogadjaj.Organizator.Dogadjaji.Add(dogadjaj);
                            }
                          _lokrepo.ChangeLokal(dogadjaj.Organizator);
                        }  
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
                if(dogadjaj.Organizator!=null)
                    if(dogadjaj.Organizator.Dogadjaji!=null)
                    {
                        dogadjaj.Organizator.Dogadjaji.Remove(dogadjaj.Organizator.Dogadjaji.Where(p=>p?.DogadjajID==dogadjaj.DogadjajID).First());
                        _lokrepo.ChangeLokal(dogadjaj.Organizator);
                        //ne izbacuje iz liste sredi sutra
                    }
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
                        {     
                            if(dog.Organizator!=null)
                                if(dog.Organizator.Dogadjaji!=null)
                                {
                                    dog.Organizator.Dogadjaji.Remove(dog.Organizator.Dogadjaji.Where(p=>p?.DogadjajID==dog.DogadjajID).First());
                                    _lokrepo.ChangeLokal(dog.Organizator);
                                }
                                _repo.DeleteDogadjaj(dog);                     
                        }
                    }
                    return Ok(dogadjaji);
                }      
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
        [HttpPut("dodajDogadjajLokalu",Name="DodajDogadjajLokalu")]
        public ActionResult<Dogadjaj> DodajDogadjajLokalu(string idDogadjaja,string idlokala)
        {
            var dogadjaj= _repo.GetDogadjajById(idDogadjaja);
            if(dogadjaj!=null)
            {
                var lokal=_lokrepo.GetLokalById(idlokala);
                if(lokal!=null)
                {
                    if(lokal.Dogadjaji!=null)
                        lokal.Dogadjaji.Add(dogadjaj);
                    if(dogadjaj.Organizator==null)
                        dogadjaj.Organizator=lokal;
                    _lokrepo.ChangeLokal(lokal);  
                }  
                _repo.CreateDogadjaj(dogadjaj);
                return Ok(dogadjaj);     
            }
            return NotFound();
        }
        [HttpGet("ObavestiKorisnike/{id}/{poruka}", Name ="ObavestiKorisnike")]
        public ActionResult<IEnumerable<Dogadjaj>> ObavestiKorisnike(string id,string poruka)
        {
            var dogadjaj=_repo.GetDogadjajById(id);
            if(dogadjaj!=null)
            {
                if(dogadjaj.Korisnici!=null)
                {
                    foreach(var kor in dogadjaj.Korisnici)
                    {
                        if(kor.inbox!=null)
                            kor.inbox.Add(poruka);
                        _korrepo.ChangeKorisnik(kor);
                    }
                }
            return Ok("Korisnici su obavesteni");
            }
            return BadRequest("Greska u slanju poruke");
        }

        
    }
}