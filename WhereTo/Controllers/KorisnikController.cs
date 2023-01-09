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
    }
}