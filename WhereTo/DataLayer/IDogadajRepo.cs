using WhereTo.Models;

namespace WhereTo.DataLayer
{
    public interface IDogadjajRepo
    {
        void CreateDogadjaj(Dogadjaj dog);
        Dogadjaj? GetDogadjajById(string id);
        IEnumerable<Dogadjaj?>? GetAllDogadjaji(string tag);
        void DeleteDogadjaj(Dogadjaj dog);

    }
}