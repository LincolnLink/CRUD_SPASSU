﻿using Crud.Domain.Models;
using System.Linq.Expressions;

namespace Crud.Domain.Interfaces
{
    public interface IRepository<T> : IDisposable where T : Entity
    {
        Task Adicionar(T entity);

        Task<T> ObterPorId(Guid id);

        Task<List<T>> ObterTodos();

        Task Atualizar(T Obj);

        Task Remover(Guid id);

        /// <summary>
        /// Expression: siginifica uma expressão LAMBDA, que trabalha com uma função,
        /// que compara a minha entidade com alguma coisa(predicate) des que ela retorna um bool.
        /// </summary>      
        Task<IEnumerable<T>> Buscar(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// int é o numero de linhas afetadas.
        /// </summary>       
        Task<int> SaveChanges();
    }
}
