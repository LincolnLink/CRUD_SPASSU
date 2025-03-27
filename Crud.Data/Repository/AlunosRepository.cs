using Crud.Data.Context;
using Crud.Domain.Interfaces;
using Crud.Domain.Models;

namespace Crud.Data.Repository
{
    public class AlunosRepository : Repository<Alunos>, IAlunosRepository
    {
        public AlunosRepository(MeuDbContext context) : base(context) { }

    }
}
