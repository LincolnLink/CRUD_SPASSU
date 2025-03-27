using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Crud.Data.Context
{
    public class MeuDbContextFactory : IDesignTimeDbContextFactory<MeuDbContext>
    {
        public MeuDbContext CreateDbContext(string[] args)
        {
            // Obtém o diretório do projeto
            var basePath = Path.Combine(Directory.GetCurrentDirectory(), "..", "Crud.Api");
            Console.WriteLine($"Base Path: {basePath}");

            // Obtém o ambiente (se não for definido, usa "Development")
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";
            Console.WriteLine($"Ambiente: {environment}");

            // Carrega a configuração do JSON
            var config = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
                .Build();

            // Obtém a string de conexão
            var connectionString = config.GetConnectionString("DefaultConnection");
            Console.WriteLine($"String de conexão carregada: {connectionString}");

            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("A string de conexão não foi encontrada no appsettings.json.");
            }

            var optionsBuilder = new DbContextOptionsBuilder<MeuDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new MeuDbContext(optionsBuilder.Options);
        }
    }
}
