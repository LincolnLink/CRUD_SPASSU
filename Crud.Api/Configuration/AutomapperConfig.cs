using AutoMapper;
using Crud.Domain.Models;
using Crud.Domain.ViewModels;

namespace Crud.Api.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {           
            CreateMap<AlunosViewModel, Alunos>();
            CreateMap<Alunos, AlunosViewModel>();
        }
    }
}
