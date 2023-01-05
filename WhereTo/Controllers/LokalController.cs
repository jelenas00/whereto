using Microsoft.AspNetCore.Mvc;
using WhereTo.DataLayer;
using WhereTo.Models;

namespace WhereTo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LokalController:ControllerBase
    {
         private IDogadjajRepo _repo;

        public LokalController(IDogadjajRepo repo)
        {
            _repo=repo;
        }
    }
}