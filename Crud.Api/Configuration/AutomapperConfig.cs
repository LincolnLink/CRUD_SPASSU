using AutoMapper;
using Crud.Domain.Models;
using Crud.Domain.ViewModels;

namespace Crud.Api.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            //CreateMap<AlunosViewModel, Alunos>();
            //CreateMap<Alunos, AlunosViewModel>();

            CreateMap<Alunos, AlunosViewModel>().ReverseMap()
            .ForMember(dest => dest.FotoUrl, opt => opt.MapFrom(src => src.FotoUrl));            

            CreateMap<Alunos, AlunosComFotoViewModel>().ReverseMap()
            .ForMember(dest => dest.FotoUrl, opt => opt.MapFrom(src => src.FotoUrl))
            .ForSourceMember(src => src.FotoUpload, opt => opt.DoNotValidate()) // Ignora FotoUpload
            .ForSourceMember(src => src.RemoveFoto, opt => opt.DoNotValidate()); // Ignora RemoveFoto
        }
    }
}
