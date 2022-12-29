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


        [HttpGet("{id}", Name ="GetDogadjajById")]
        public ActionResult<Dogadjaj> GetDogadjajById(string id)
        {
            var dogadjaj= _repo.GetDogadjajById(id);

            if(dogadjaj!=null)
            {
                return Ok(dogadjaj);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<Dogadjaj> CreateDogadjaj(Dogadjaj dogadjaj)
        {
            _repo.CreateDogadjaj(dogadjaj);
            return CreatedAtRoute(nameof(GetDogadjajById), new {Id=dogadjaj.DogadjajID},dogadjaj);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Dogadjaj>> GetAllDogadjaj()
        {
            return Ok(_repo.GetAllDogadjaji());
        }
    }
}