import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAlunos, deleteAluno } from '../services/alunoService';

const AlunoList = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const data = await getAlunos();
        setAlunos(data);
      } catch (error) {
        setError('Não foi possível carregar a lista de alunos. Verifique a conexão com a API.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlunos();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir este aluno?')) {        
        await deleteAluno(id);
        setAlunos(alunos.filter(aluno => aluno.id !== id));
      }      
    } catch (error) {
      setError('Erro ao excluir o aluno. Tente novamente mais tarde.', error);
    }
  };
  
  if (loading) return <div className="progress"><div className="indeterminate"></div></div>;
  if (error) return <div className="red-text">{error}</div>;

  return (
    <div >
      <div>
        <h1 className="center-align">Lista de Alunos</h1>
      </div>
      <div className=''>
        {/* Botão de Criar Novo */}
        <div className="center-align">
          <Link to="/criar" className="waves-effect waves-light btn-large blue darken-2">
            Criar Novo
          </Link>
        </div>
      </div>
      <div className="container">
        {/* Lista de Alunos */}
        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th className="right-align">Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.idade} anos</td>
                <td className="right-align">
                  <Link
                    to={`/editar/${aluno.id}`}
                    className="waves-effect waves-light btn-small blue darken-2"
                  >
                  <i className="material-icons left">edit</i>Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(aluno.id)}
                    className="waves-effect waves-light btn-small red darken-2"
                    style={{ marginLeft: '10px' }}
                  >
                    <i className="material-icons left">delete</i>Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default AlunoList;
