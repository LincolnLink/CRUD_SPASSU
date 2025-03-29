using AutoMapper;
using Crud.Domain.Interfaces;
using Crud.Domain.Models;
using Crud.Domain.others;
using Crud.Domain.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            _alunoRepository = alunoRepository;
            _alunosService = alunosServico;
        }

        [HttpGet("ObterTodos")]
        public async Task<ActionResult<IEnumerable<AlunosViewModel>>> ObterTodos()
        {
            var alunos = await _alunoRepository.ObterTodos();

            var alunosViewModel = _mapper.Map<IEnumerable<AlunosViewModel>>(alunos);
            return Ok(alunosViewModel);
        }

        [HttpGet("ObterTodosPaginado")]
        public async Task<ActionResult<PagedResult<AlunosViewModel>>> ObterTodosPaginado([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var (alunos, totalRecords) = await _alunoRepository.ObterTodosPaginado(pageNumber, pageSize);

            var alunosViewModel = _mapper.Map<IEnumerable<AlunosViewModel>>(alunos);

            return Ok(new
            {
                items = alunosViewModel, // Lista paginada de alunos
                totalRecords // Total de alunos (para controle da paginação no frontend)
            });
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

            if (alunosAtualizacao == null)
            {
                NotificarErro("Aluno não encontrado.");
                return CustomResponse();
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);


            try
            {
                // Atualiza os campos
                alunosAtualizacao.Nome = alunosViewModel.Nome;
                alunosAtualizacao.Idade = alunosViewModel.Idade;

                // Chama o serviço de atualização
                await _alunosService.Atualizar(_mapper.Map<Alunos>(alunosAtualizacao));

                return CustomResponse(alunosViewModel);
            }
            catch (Exception ex)
            {
                // Log do erro (caso tenha um logger)
                Console.WriteLine($"Erro ao atualizar aluno: {ex.Message}");

                NotificarErro("Ocorreu um erro ao atualizar o aluno.");
                return CustomResponse();
            }
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
