using System.Threading.Tasks;
using Sita.APC.Toolset.Domain.Interfaces;
using Sita.APC.Toolset.Services.Interfaces;

namespace Sita.APC.Toolset.Services.API
{
    public class AirportServices : IApplicationProgrammingInterface<IAirport>
    {
        private readonly IAirportService<IAirport> _airportService;

        public AirportServices(IAirportService<IAirport> airport)
        {
            _airportService = airport;
        }

        public Task<IAirport> Create(IAirport entity)
        {
            throw new System.NotImplementedException();
        }

        public Task Delete(string id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IAirport> Find(string id)
        {
            throw new System.NotImplementedException();
        }

        public Task<System.Collections.Generic.List<IAirport>> FindAll()
        {
            throw new System.NotImplementedException();
        }

        public Task<IAirport> Update(IAirport entity)
        {
            throw new System.NotImplementedException();
        }
    }
}