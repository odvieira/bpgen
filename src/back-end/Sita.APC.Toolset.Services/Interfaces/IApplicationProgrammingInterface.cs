using Sita.APC.Toolset.Core.Database;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sita.APC.Toolset.Services.Interfaces
{
    public interface IApplicationProgrammingInterface<T> where T : IModelBase
    {
        Task<T> Create(T entity);

        Task<List<T>> FindAll();

        Task<T> Find(string id);

        Task<T> Update(T entity);

        Task Delete(string id);
    }
}
