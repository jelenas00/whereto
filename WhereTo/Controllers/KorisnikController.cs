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

        public KorisnikController(IKorisnikRepo repo)
        {
            _repo=repo;
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

        [HttpPost(Name="CreateKorisnik")]
        public ActionResult<Korisnik> CreateKorisnik(Korisnik korisnik)
        {
            _repo.CreateKorisnik(korisnik);

            return CreatedAtRoute(nameof(GetKorisnikById), new {Id=korisnik.KorisnikID},korisnik);
            //return Ok(korisnik);
        }


        [HttpDelete("id/{id}", Name ="DeleteKorisnik")]
        public ActionResult<Korisnik>? DeleteKorisnik(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                _repo.DeleteKorisnik(id);
                return Ok("Korisnik deleted!");
            }
            return BadRequest("Invalid ID!");
        }

        [HttpPut(Name="ChangeKorisnik")]
        public ActionResult<Korisnik>? ChangeKorisnik(Korisnik korisnik)
        {
            _repo.ChangeKorisnik(korisnik);
            return CreatedAtRoute(nameof(GetKorisnikById), new {Id=korisnik.KorisnikID},korisnik);        
        }
    }
}