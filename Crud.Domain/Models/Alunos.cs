using Microsoft.AspNetCore.Http;

namespace Crud.Domain.Models
{
    public class Alunos : Entity
    {
        public string Nome { get; set; }

        public int Idade { get; set; }

        //public IFormFile Foto { get; set; }

    }
}
