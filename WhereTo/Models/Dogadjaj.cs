using System.ComponentModel.DataAnnotations;

namespace WhereTo.Models
{
    public class Dogadjaj
    {
        [Required]
        public string DogadjajID { get; set; }= $"dogadjaj:{Guid.NewGuid().ToString()}";
        [Required]
        public string Name { get; set; }=String.Empty;

        public Lokal? Organizator { get; set; }
        public List<Korisnik>? Korisnici { get; set; }
        public string? Datum { get; set; }
    }
}