using System.Threading.Tasks;
using Sita.APC.Toolset.Core.Database;

namespace Sita.APC.Toolset.Services.API
{
    public interface IAirportService<T> where T: IModelBase
    {
        Task<T> DecodeCity(T code);
    }
}