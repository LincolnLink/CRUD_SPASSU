using Crud.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Crud.Data.Context
{
    public class MeuDbContext : DbContext
    {
        public MeuDbContext(DbContextOptions<MeuDbContext> options) : base(options)
        {
        }

        public DbSet<Alunos> Alunos { get; set; } // Tabela no banco

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurações adicionais do EF Core (exemplo: nome da tabela)
            modelBuilder.Entity<Alunos>().ToTable("Alunos");
        }
    }
}
