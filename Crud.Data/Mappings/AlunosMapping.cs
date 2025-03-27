using Crud.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crud.Data.Mappings
{
    public class AlunosMapping : IEntityTypeConfiguration<Alunos>
    {
        public void Configure(EntityTypeBuilder<Alunos> builder)
        {
            // Define a chave primaria
            builder.HasKey(p => p.Id);

            // Define o campo como requirido, define o tipo da coluna            
            builder.Property(p => p.Nome)
                .IsRequired()
                .HasColumnType("varchar(50)");

            builder.Property(p => p.Idade)
                .IsRequired()
                .HasColumnType("int");
        }
    }
}
