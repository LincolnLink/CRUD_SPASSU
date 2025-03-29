using Crud.Domain.Models;

namespace Crud.Domain.Interfaces
{
    public interface IAlunosRepository : IRepository<Alunos>
    {
        Task<(List<Alunos>, int)> ObterTodosPaginado(int pageNumber, int pageSize);
    }
}
