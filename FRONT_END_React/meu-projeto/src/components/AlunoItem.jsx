import React from 'react';
import { Link } from 'react-router-dom';

const AlunoItem = ({ aluno, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      onDelete(aluno.id);
    }
  };

  return (
    <li className="collection-item">
      <div>
        <span>{aluno.nome} ({aluno.idade} anos)</span>
        
          <Link 
            to={`/editar/${aluno.id}`} 
            className="fl waves-effect waves-light btn-small blue darken-2">
            <i className="material-icons left">edit</i>Editar
          </Link>              
          <button 
            onClick={handleDelete}
            className="fl btn-small red darken-2">
            <i className="material-icons left">delete</i>Excluir
          </button>
        
      </div>     
    </li>
  );
};

export default AlunoItem;
