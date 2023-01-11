using Microsoft.AspNetCore.Mvc;
using WhereTo.DataLayer;
using WhereTo.Models;

namespace WhereTo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KorisnikController:ControllerBase
    {
         private IKorisnikRepo _repo;
         private IDogadjajRepo _dogrepo;
         private ILokalRepo _lokrepo;

        public KorisnikController(IKorisnikRepo repo,IDogadjajRepo dogr,ILokalRepo lokrepo)
        {
            _repo=repo;
            _dogrepo=dogr;
            _lokrepo=lokrepo;
        }


        [HttpGet("id/{id}", Name = "GetKorisnikById")]
        public ActionResult<Korisnik> GetKorisnikById(string id)
        {
            var korisnik = _repo.GetKorisnikById(id);

            if (korisnik != null)
            {
                return Ok(korisnik);
            }

            return NotFound();
        }

        [HttpGet("", Name="GetAllKorisnici")]
        public ActionResult<Korisnik> GetAllKorisnici()
        {
            var korisnici= _repo.GetAllKorisnici();
            
            if (korisnici != null)
            {
                return Ok(korisnici);
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult<Korisnik> CreateKorisnik(Korisnik korisnik)
        {
            var korisnici = _repo.GetAllKorisnici();
            if (korisnici != null)
            {
                foreach(var kor in korisnici)
                    {
                        if(kor!=null)
                        {
                            if(String.Equals(kor.Email,korisnik.Email)==true&&String.Equals(kor.Password,korisnik.Password)==true)
                                return BadRequest("Postoji korisnik sa tim mejlom ili pasvordom");
                        }
                    }     
            }     
            _repo.CreateKorisnik(korisnik);
            return Ok(korisnik);
        }
        

        [HttpDelete("id/{id}", Name ="DeleteKorisnik")]
        public ActionResult<Korisnik>? DeleteKorisnik(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var korisnik=_repo.GetKorisnikById(id);
                if(korisnik!=null)
                    {
                    _repo.DeleteKorisnik(id);
                    return Ok("Korisnik deleted!");
                    }
            }
            return BadRequest("Invalid ID!");
        }

        [HttpGet("Prijava/{mail}/{password}", Name = "PrijavaNaSajt")]
        public ActionResult<Korisnik> PrijavaNaSajt(string mail,string password)
        {
            var korisnici = _repo.GetAllKorisnici();

            if (korisnici != null)
            {
                foreach(var korisnik in korisnici)
                    {
                        if(korisnik!=null)
                        {
                            if(String.Equals(korisnik.Email,mail)==true&&String.Equals(korisnik.Password,password)==true)
                                return Ok(korisnik);
                        }
                    }     
            }
            return NotFound();
        }
        [HttpPut(Name="ChangeKorisnik")]
        public ActionResult<Korisnik>? ChangeKorisnik(Korisnik korisnik)
        {
            var korisnici = _repo.GetAllKorisnici();
            if (korisnici != null)
            {
                foreach(var kor in korisnici)
                {
                    if(kor!=null)
                    {
                        if(String.Equals(kor.Email,korisnik.Email)==true&&String.Equals(kor.Password,korisnik.Password)==true)
                            return BadRequest("Postoji korisnik sa tim mejlom ili pasvordom");
                    }
                }
                
            }     
            
            _repo.ChangeKorisnik(korisnik);
            
            return Ok(korisnik);     
        }
        [HttpPut("PrijavaNaDogadjaj",Name ="PrijaviSeNaDogadjaj")]
        public ActionResult<Korisnik> PrijaviSeNaDogadjaj(string idd,string idk)
        {
            var dogadjaj=_dogrepo.GetDogadjajById(idd);
            var korisnik=_repo.GetKorisnikById(idk);

            if (dogadjaj!=null)
            {
                if(korisnik!=null)
                {
                    if(dogadjaj.Korisnici==null)
                    {
                        dogadjaj.Korisnici=new List<Korisnik>();
                    }
                    dogadjaj.Korisnici.Add(korisnik);
                    if(dogadjaj.Organizator!=null)
                    {
                        if(dogadjaj.Organizator.Dogadjaji!=null)
                        {
                            dogadjaj.Organizator.Dogadjaji.Remove(dogadjaj.Organizator.Dogadjaji.Where(p=>p?.DogadjajID==dogadjaj.DogadjajID).First());
                            dogadjaj.Organizator.Dogadjaji.Add(dogadjaj);
                            _lokrepo.ChangeLokal(dogadjaj.Organizator);
                        }
                       
                    }
                    _repo.ChangeKorisnik(korisnik);
                    _dogrepo.CreateDogadjaj(dogadjaj);
                    return Ok(korisnik);
                }
                return BadRequest("losa prijava na dogadjaj");
            }
            return Ok("losa prijava na dogadjaj");
        }
    }
}