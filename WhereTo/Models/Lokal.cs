namespace WhereTo.Models
{
    public class Lokal
    {
        public string LokalID { get; set; }= $"lokal:{Guid.NewGuid().ToString()}";
        public string? Name { get; set; }
        public string? Lokacija { get; set; }
        public string? Vlasnik { get; set; }
        public string? RadnoVreme { get; set; }
        public string? Opis { get; set; }
        public List<Dogadjaj>? Dogadjaji { get; set; }
    }
}