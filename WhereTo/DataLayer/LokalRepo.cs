using System.Text.Json;
using StackExchange.Redis;
using WhereTo.Models;

namespace WhereTo.DataLayer
{
    public class LokalRepo: ILokalRepo
    {
        private IConnectionMultiplexer _redis;

        public LokalRepo(IConnectionMultiplexer redis)
        {
            _redis=redis;
        }
    }
}