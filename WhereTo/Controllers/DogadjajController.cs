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

        [Route("GetDogadjajById/{id}")]
        [HttpGet]//("id/{id}", Name ="GetDogadjajById")]
        public ActionResult<Dogadjaj> GetDogadjajById(string id)
        {
            var dogadjaj= _repo.GetDogadjajById(id);

            if(dogadjaj!=null)
            {
                return Ok(dogadjaj);
            }

            return NotFound();
        }

        [Route("GetAllDogadjajByTag/{tag}")]
        [HttpGet]//("tag/{tag}", Name ="GetAllDogadjajByTag")]
        public ActionResult<IEnumerable<Dogadjaj>> GetAllDogadjajByTag(string tag)
        {
            return Ok(_repo.GetAllDogadjaji(tag));
        }
        [Route("GetDogadjajeLokala/{id}")]
        [HttpGet]//("tag/{tag}", Name ="GetAllDogadjajByTag")]
        public ActionResult<IEnumerable<Dogadjaj>> GetDogadjajeLokala(string id)
        {
            var listaDogadjaja=new List<Dogadjaj>();
            var lok=_lokrepo.GetLokalById(id);
            if(lok!=null)
            {
                if(lok.Dogadjaji!=null)
                    foreach(var dog in lok.Dogadjaji)
                    {
                        var doga=_repo.GetDogadjajById(dog);
                        if(doga!=null)
                            listaDogadjaja.Add(doga);
                    }
            }
            return Ok(listaDogadjaja);
        }

        [Route("ChangeDogadjaj")]
        [HttpPut]//(Name="ChangeLokal")]
        public ActionResult<Lokal>? ChangeDogadjaj(Dogadjaj dog)
        {
            var dogadjaj= _repo.GetDogadjajById(dog.DogadjajID);
            if(dogadjaj!=null)
            {
                return Ok(_repo.ChangeDogadjaj(dog));
            }
            else return BadRequest("Nevalidan dogadjaj");
        }

        [Route("DodajTagDogadjaju/{idDogadjaja}/{tag}")]
        [HttpPut]
        public ActionResult<Dogadjaj> DodajTagDogadjaju(string idDogadjaja,string tag)
        {
            var dogadjaj= _repo.GetDogadjajById(idDogadjaja);
            if(dogadjaj!=null)
            {
                if(dogadjaj.listaTagova!=null)
                {
                    int ponavljanjeTaga=0;
                    foreach(var el in dogadjaj.listaTagova)
                        if(String.Equals(el,tag)==true)
                            ponavljanjeTaga++;
                    if(ponavljanjeTaga==0)
                        dogadjaj.listaTagova.Add(tag);                 
                    _repo.ChangeDogadjaj(dogadjaj);

                return Ok(dogadjaj);
                }
            }

            return NotFound();
        }

        [Route("DeleteDogadjaj/{id}")]
       [HttpDelete]//("id/{id}", Name ="DeleteDogadjaj")]
        public ActionResult<Dogadjaj> DeleteDogadjaj(string id)
        {
            var dogadjaj=_repo.GetDogadjajById(id);
            if(dogadjaj!=null)
            {
                if(dogadjaj.Organizator!=null)
                    if(dogadjaj.Organizator.Dogadjaji!=null)
                    {
                        dogadjaj.Organizator.Dogadjaji.Remove(dogadjaj.DogadjajID);
                        _lokrepo.ChangeLokal(dogadjaj.Organizator);
                        
                    }
                if(dogadjaj.listaTagova!=null)
                {
                    _repo.DeleteDogadjaj(dogadjaj); 
                }
            }
            return Ok(dogadjaj);
        }
        [Route("DeleteDogadjajByDate/{date}")]
        [HttpDelete]//("date/{date}", Name ="DeleteDogadjajByDate")]
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
                                    dog.Organizator.Dogadjaji.Remove(dog.DogadjajID);
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

        [Route("CreateDogadjaj")]
        [HttpPost]
        public ActionResult<Dogadjaj> CreateDogadjaj(Dogadjaj dogadjaj)
        {
           var resp= new Dogadjaj();
            if(dogadjaj.listaTagova!=null)
            {
                int ponavljanjeTaga=0;
                    foreach(var el in dogadjaj.listaTagova)
                        if(String.Equals(el,"Dogadjaj")==true)
                            ponavljanjeTaga++;
                if(ponavljanjeTaga==0)
                    dogadjaj.listaTagova.Add("Dogadjaj");
                if(dogadjaj.Organizator!=null)
                {
                    var lokal=_lokrepo.GetLokalById(dogadjaj.Organizator.LokalID);
                    if(lokal!=null)
                    {
                        if(lokal.Dogadjaji!=null)
                        {
                            lokal.Dogadjaji.Add(dogadjaj.DogadjajID);
                            foreach(var dogID in lokal.Dogadjaji)
                                    {
                                        var dog=_repo.GetDogadjajById(dogID);
                                        if(dog!=null)
                                        {
                                        dog.Organizator=lokal;
                                        _repo.ChangeDogadjaj(dog);
                                        }
                                    }
                        }
                        dogadjaj.Organizator=lokal;
                        _lokrepo.ChangeLokal(lokal);  
                    }
                }
                resp=_repo.CreateDogadjaj(dogadjaj);
            }
            else
            {
                 if(dogadjaj.Organizator!=null)
                {
                    var lokal=_lokrepo.GetLokalById(dogadjaj.Organizator.LokalID);
                    if(lokal!=null)
                    {
                        if(lokal.Dogadjaji!=null)
                        {
                            lokal.Dogadjaji.Add(dogadjaj.DogadjajID);
                            foreach(var dogID in lokal.Dogadjaji)
                                    {
                                        var dog=_repo.GetDogadjajById(dogID);
                                        if(dog!=null)
                                        {
                                        dog.Organizator=lokal;
                                        _repo.ChangeDogadjaj(dog);
                                        }
                                    }
                        }
                        dogadjaj.Organizator=lokal;
                        _lokrepo.ChangeLokal(lokal);  
                    }
                }
                dogadjaj.listaTagova?.Add("Dogadjaj");
                resp=_repo.CreateDogadjaj(dogadjaj);
            }
            
            if(resp!=null)
                return Ok(resp);
            else 
                return BadRequest("Somethihng went wrong");
        }

        [Route("DodajDogadjajLokalu")]
        [HttpPut]//("dodajDogadjajLokalu",Name="DodajDogadjajLokalu")]
        public ActionResult<Dogadjaj> DodajDogadjajLokalu(string idDogadjaja,string idlokala)
        {
            var dogadjaj= _repo.GetDogadjajById(idDogadjaja);
            if(dogadjaj!=null)
            {
                var lokal=_lokrepo.GetLokalById(idlokala);
                if(lokal!=null)
                {
                    if(lokal.Dogadjaji!=null)
                        lokal.Dogadjaji.Add(dogadjaj.DogadjajID);
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
                        var kori=_korrepo.GetKorisnikById(kor.KorisnikID);
                        if(kori!=null)
                        {
                            if(kor.inbox!=null)
                                kor.inbox.Add(poruka);
                            _repo.CreateDogadjaj(dogadjaj);
                            _korrepo.ChangeKorisnik(kor);
                        }
                    }
                }
            return Ok("Korisnici su obavesteni");
            }
            return BadRequest("Greska u slanju poruke");
        }

        
    }
}