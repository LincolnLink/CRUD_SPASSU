import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAlunos, deleteAluno } from '../services/alunoService';
import AlunoItem from './AlunoItem';

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
      await deleteAluno(id);
      setAlunos(alunos.filter(aluno => aluno.id !== id));
    } catch (error) {
      setError('Erro ao excluir o aluno. Tente novamente mais tarde.', error);
    }
  };

  
  if (loading) return <div className="progress"><div className="indeterminate"></div></div>;

  if (error) return <div className="red-text">{error}</div>;

  return (
    <div className="container">
      <h1 className="center-align">Lista de Alunos</h1>

      {/* Botão de Criar Novo */}
      <div className="row">
        <Link to="/criar" className="waves-effect waves-light btn-large blue darken-2">
          Criar Novo
        </Link>
      </div>

      {/* Lista de Alunos */}
      <ul className="collection with-header">
        <li className="collection-header">
          <h4>Alunos Cadastrados</h4>
        </li>
        {alunos.map((aluno) => (
          <AlunoItem key={aluno.id} aluno={aluno} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default AlunoList;
