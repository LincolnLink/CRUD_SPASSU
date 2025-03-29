using Crud.Data.Context;
using Crud.Domain.Interfaces;
using Crud.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Crud.Data.Repository
{
    public class AlunosRepository : Repository<Alunos>, IAlunosRepository
    {
        public AlunosRepository(MeuDbContext context) : base(context) { }


        public virtual async Task<(List<Alunos>, int)> ObterTodosPaginado(int pageNumber, int pageSize)
        {
            var query = DbSet.AsQueryable();

            var totalRecords = await query.CountAsync();
            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalRecords);
        }

        
    }
}
