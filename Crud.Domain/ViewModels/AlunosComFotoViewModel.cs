using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crud.Domain.ViewModels
{
    public class AlunosComFotoViewModel
    {
        public Guid? Id { get; set; } // Id opcional na criação

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(50, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [Range(1, 150, ErrorMessage = "O campo {0} deve estar entre {1} e {2}")]
        public int Idade { get; set; }

        public IFormFile? FotoUpload { get; set; }

        public string? FotoUrl { get; set; }

        public bool RemoveFoto { get; set; }
    }
}
