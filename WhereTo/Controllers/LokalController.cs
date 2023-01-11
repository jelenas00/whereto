using Microsoft.AspNetCore.Mvc;
using WhereTo.DataLayer;
using WhereTo.Models;

namespace WhereTo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LokalController:ControllerBase
    {
        private ILokalRepo _repo;
        private IDogadjajRepo _dogrepo;

        public LokalController(ILokalRepo repo,IDogadjajRepo dogrepo)
        {
            _repo=repo;
            _dogrepo=dogrepo;
        }

        [HttpGet("id/{id}", Name="GetLokalById")]
        public ActionResult<Lokal> GetLokalById(string id)
        {
            var lokal= _repo.GetLokalById(id);
            if(lokal!=null)
            {
                return Ok(lokal);
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult<Lokal> CreateLokal(Lokal lok)
        {
            if(lok.Tagovi!=null)
            {
                int ponavljanjeTaga=0;
                foreach(var el in lok.Tagovi)
                        if(String.Equals(el,"Lokal")==true)
                            ponavljanjeTaga++;
                if(ponavljanjeTaga==0)
                    lok.Tagovi.Add("Lokal");
                _repo.CreateLokal(lok);
            }
            return Ok(lok);
        }

        [HttpGet("", Name="GetLokali")]
        public ActionResult<Lokal> GetLokali()
        {
            var lokal= _repo.GetAllLokali();
            if(lokal!=null)
            {
                return Ok(lokal);
            }
            return NotFound();
        }
        [HttpGet("VratiPoTagu/{tag}", Name="VratiLokalePoTagu")]
        public ActionResult<Lokal> VratiLokalePoTagu(string tag)
        {   
            var lokali= _repo.GetLokaliByTag(tag);
            if(lokali!=null)
            {
                return Ok(lokali);
            }
            return NotFound();
        }

        [HttpDelete("id/{id}", Name ="DeleteLokal")]
        public ActionResult<Lokal>? DeleteLokal(string id)
        {
            if(!string.IsNullOrEmpty(id))
            {
                var lokal=_repo.GetLokalById(id);
                if(lokal!=null)
                {
                    if(lokal.Dogadjaji!=null)
                    {
                        foreach(var dog in lokal.Dogadjaji)
                        {
                            if(dog!=null)
                               _dogrepo.DeleteDogadjaj(dog); 
                            
                        }
                    }
                    _repo.DeleteLokal(id);
                    return Ok("Objest deleteted");
                }
            }
            return BadRequest("Invalid id");
        }

        [HttpPut(Name="ChangeLokal")]
        public ActionResult<Lokal>? ChangeKorisnik(Lokal lok)
        {
            var lokal=_repo.GetLokalById(lok.LokalID);
                if(lokal!=null)
                {
                    if(lokal.Dogadjaji!=null)
                    {
                        foreach(var dog in lokal.Dogadjaji)
                        {
                            if(dog!=null)
                            {
                                dog.Organizator=lok;
                               _dogrepo.CreateDogadjaj(dog); 
                            }
                            
                        }
                    }
                }
            _repo.ChangeLokal(lok);
            return CreatedAtRoute(nameof(GetLokalById), new {Id=lok.LokalID},lok);
        }
    }
}