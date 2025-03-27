using Crud.Business.Services;
using Crud.Data.Context;
using Crud.Data.Repository;
using Crud.Domain.Interfaces;
using Crud.Domain.Notificacoes;

namespace Crud.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<MeuDbContext>();
            services.AddScoped<IAlunosRepository, AlunosRepository>();
            services.AddScoped<IAlunosService, AlunosService>();

            services.AddScoped<INotificador, Notificador>();
            
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            //services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

            return services;
        }
    }
}
