using Crud.Business.Validations;
using Crud.Domain.Interfaces;
using Crud.Domain.Models;

namespace Crud.Business.Services
{
    public class AlunosService : BaseService, IAlunosService
    {
        private readonly IAlunosRepository _alunosRepository;
        
        public AlunosService(
                IAlunosRepository alunosRepository,
                INotificador notificador
                              ) : base(notificador)
        {
            _alunosRepository = alunosRepository;           
        }

        public async Task Adicionar(Alunos alunos)
        {
            if (!ExecutarValidacao(new AlunosValidation(), alunos)) return;

            await _alunosRepository.Adicionar(alunos);
        }

        public async Task Atualizar(Alunos alunos)
        {
            if (!ExecutarValidacao(new AlunosValidation(), alunos)) return;

            await _alunosRepository.Atualizar(alunos);
        }              

        public async Task Remover(Guid id)
        {
            await _alunosRepository.Remover(id);
        }

        public void Dispose()
        {
            _alunosRepository?.Dispose();
        }
    }
}
