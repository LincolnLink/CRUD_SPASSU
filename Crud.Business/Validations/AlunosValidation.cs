using Crud.Domain.Models;
using FluentValidation;

namespace Crud.Business.Validations
{
    public class AlunosValidation : AbstractValidator<Alunos>
    {
        public AlunosValidation()
        {
            RuleFor(c => c.Nome)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .Length(2, 50).WithMessage("O campo {PropertyName} precisa ter entre {MinLength} e {MaxLength} caracteres");
                        
            // Valor maior que 0
            RuleFor(c => c.Idade)
                .GreaterThan(0).WithMessage("O campo {PropertyName} precisa ser maior que {ComparisonValue}");
        }
    }
}
