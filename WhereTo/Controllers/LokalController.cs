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

        public LokalController(ILokalRepo repo)
        {
            _repo=repo;
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
            _repo.CreateLokal(lok);
            return CreatedAtRoute(nameof(GetLokalById), new {Id=lok.LokalID},lok);
            //return Ok(lok);
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

        [HttpDelete("id/{id}", Name ="DeleteLokal")]
        public ActionResult<Lokal>? DeleteLokal(string id)
        {
            if(!string.IsNullOrEmpty(id))
            {
                _repo.DeleteLokal(id);
                return Ok("Objest deleteted");
            }
            return BadRequest("Invalid id");
        }

        [HttpPut(Name="ChangeLokal")]
        public ActionResult<Lokal>? ChangeKorisnik(Lokal lok)
        {
            _repo.ChangeLokal(lok);
            return CreatedAtRoute(nameof(GetLokalById), new {Id=lok.LokalID},lok);
        }
    }
}