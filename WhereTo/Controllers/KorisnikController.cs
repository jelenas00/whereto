using Microsoft.AspNetCore.Mvc;
using WhereTo.DataLayer;
using WhereTo.Models;

namespace WhereTo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KorisnikController:ControllerBase
    {
         private IDogadjajRepo _repo;

        public KorisnikController(IDogadjajRepo repo)
        {
            _repo=repo;
        }
    }
}