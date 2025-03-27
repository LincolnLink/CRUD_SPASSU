using Crud.Domain.Interfaces;
using Crud.Domain.Notificacoes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Crud.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly INotificador _notificador;

        public MainController(INotificador notificador)
        {
            _notificador = notificador;
        }

        /// <summary>
        /// Informa se a operação é valida ou não(se tem notificação de erro ou não);
        /// </summary>        
        protected bool OperacaoValida()
        {
            return !_notificador.TemNotificacao();
        }

        /// <summary>
        /// Tratamento de erros da camada de negocios.
        /// </summary>
        protected ActionResult CustomResponse(object result = null)
        {
            if (OperacaoValida())
            {
                return Ok(new
                {
                    success = true,
                    data = result
                });
            }

            return BadRequest(new
            {
                success = false,
                errors = _notificador.ObterNotificacoes().Select(n => n.Mensagem)
            });
        }

        /// <summary>
        /// Trata os erros recebidos na ModelState, antes da camada de negocios.
        /// </summary>
        /// <param name="modelState"></param>
        /// <returns></returns>
        protected ActionResult CustomResponse(ModelStateDictionary modelState)
        {
            if (!modelState.IsValid) NotificarErroModelInvalida(modelState);
            return CustomResponse();
        }

        /// <summary>
        /// Ele notifica o erro da modelState invalida.
        /// </summary>
        protected void NotificarErroModelInvalida(ModelStateDictionary modelState)
        {
            // Pega apenas os erros.
            var erros = modelState.Values.SelectMany(e => e.Errors);
            foreach (var erro in erros)
            {
                // garante que pega os erros da Exception.
                var errorMsg = erro.Exception == null ? erro.ErrorMessage : erro.Exception.Message;
                NotificarErro(errorMsg);
            }
        }

        /// <summary>
        /// Lança o objeto notificação para uma fila de erros.
        /// </summary>        
        protected void NotificarErro(string mensagem)
        {
            _notificador.Handle(new Notificacao(mensagem));
        }
    }
}
