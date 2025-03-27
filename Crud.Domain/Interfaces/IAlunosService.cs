using Crud.Domain.Models;

namespace Crud.Domain.Interfaces
{
    public interface IAlunosService : IDisposable
    {
        Task Adicionar(Alunos alunos);
        Task Atualizar(Alunos alunos);
        Task Remover(Guid id);
    }
}
