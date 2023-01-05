using System.ComponentModel.DataAnnotations;

namespace WhereTo.Models
{
    public class Korisnik
    {
        public string KorisnikID { get; set; }=$"korisnik:{Guid.NewGuid().ToString()}";

        public string Name { get; set; }=String.Empty;
        public string LastName { get; set; }=String.Empty;
        [Required]
        public string Email { get; set; }=String.Empty;
        [Required]
        public string Password { get; set; }=String.Empty;
        public List<Dogadjaj>? Dogadjaji { get; set; }


    }
}