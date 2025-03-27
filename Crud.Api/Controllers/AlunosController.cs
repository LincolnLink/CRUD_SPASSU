using AutoMapper;
using Crud.Domain.Interfaces;
using Crud.Domain.Models;
using Crud.Domain.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Crud.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController : MainController
    {
        private readonly IMapper _mapper;
        private readonly IAlunosService _alunosService;
        private readonly IAlunosRepository _alunoRepository;

        public AlunosController(
            IAlunosRepository alunoRepository,
            IAlunosService alunosServico,
            INotificador notificador,
            IMapper mapper
            ) : base(notificador)
        {
            _mapper = mapper;
        }

        [HttpGet("ObterTodos")]
        public async Task<ActionResult<IEnumerable<AlunosViewModel>>> ObterTodos()
        {
            var alunos = _mapper.Map<IEnumerable<AlunosViewModel>>(await _alunoRepository.ObterTodos());
            return Ok(alunos);
        }


        [HttpGet("{id:guid}")]
        public async Task<ActionResult<AlunosViewModel>> ObterPorId(Guid id)
        {
            // Converte o model aluno para alunoViewModel.           
            var alunosViewModel = await ObterAluno(id);

            if (alunosViewModel == null) return NotFound(); //404 não encontrado.

            return Ok(alunosViewModel);
        }


        private async Task<AlunosViewModel> ObterAluno(Guid id)
        {
            return _mapper.Map<AlunosViewModel>(await _alunoRepository.ObterPorId(id));
        }
        
        
        [HttpPost("Adicionar")]
        public async Task<ActionResult<AlunosViewModel>> Adicionar(AlunosViewModel alunosViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);
                        
            await _alunosService.Adicionar(_mapper.Map<Alunos>(alunosViewModel));

            return CustomResponse(alunosViewModel);
        }

                
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Atualizar(Guid id, AlunosViewModel alunosViewModel)
        {
            if (id != alunosViewModel.Id)
            {
                NotificarErro("Os ids informados não são iguais!");
                return CustomResponse();
            }

            var alunosAtualizacao = await ObterAluno(id);

            if (!ModelState.IsValid) return CustomResponse(ModelState);
                        
            alunosAtualizacao.Nome = alunosViewModel.Nome;
            alunosAtualizacao.Idade = alunosViewModel.Idade;
            
            await _alunosService.Atualizar(_mapper.Map<Alunos>(alunosAtualizacao));

            return CustomResponse(alunosViewModel);
        }

                
        [HttpDelete("{id:guid}")] //converte para guid
        public async Task<ActionResult<AlunosViewModel>> Excluir(Guid id)
        {
            var alunoViewModel = await ObterAluno(id);
            
            if (alunoViewModel == null) return NotFound();

            await _alunosService.Remover(id);
            
            return CustomResponse(alunoViewModel);
        }
    }
}
