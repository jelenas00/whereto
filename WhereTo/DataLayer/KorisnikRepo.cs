using System.Text.Json;
using StackExchange.Redis;
using WhereTo.Models;

namespace WhereTo.DataLayer
{
    public class KorisnikRepo: ILokalRepo
    {
        private IConnectionMultiplexer _redis;

        public KorisnikRepo(IConnectionMultiplexer redis)
        {
            _redis=redis;
        }
    }
}