import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { getAlunoById, createAluno, updateAluno } from '../services/alunoService';

const AlunoForm = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Pega o ID da URL (para edição)
  const navigate = useNavigate(); // Use useNavigate ao invés de useHistory

  useEffect(() => {
    if (id) {
      // Se há um ID na URL, buscamos os dados do aluno para editar
      const fetchAluno = async () => {
        try {
          const aluno = await getAlunoById(id);
          setNome(aluno.nome);
          setIdade(aluno.idade);
        } catch (err) {
          setError('Erro ao carregar os dados do aluno.');
          console.log('erro:', err)
        }
      };
      fetchAluno();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se nome ou idade estão vazios ou nulos
    if (!nome || !idade) {
      setError('Nome e Idade são obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      if (id) {
        // Se tiver um id, fazemos a atualização
        await updateAluno(id, {id, nome, idade });
      } else {
        // Se não tiver um id, criamos um novo aluno
        await createAluno({ nome, idade });
      }

      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError('Erro ao salvar os dados do aluno.');
      console.log('erro:', err)
    }
  };

  const handleGoBack = () => {
    navigate('/'); // Redireciona para a lista de alunos
  };

  return (
    <div className="container">
      <h1 className="center-align">{id ? 'Editar Aluno' : 'Cadastrar Aluno'}</h1>
      <form onSubmit={handleSubmit} className="col s12">
        <div className="input-field">
          <label htmlFor="nome" className='active '>Nome:</label>
          <input
            type="text"
            id="nome"
            className="validate"
            value={nome}
            onChange={(e) => setNome(e.target.value)}            
            required
          />
        </div>

        <div className="input-field">
          <label htmlFor="idade" className='active '>Idade:</label>
          <input
            type="number"
            id="idade"
            className="validate"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}            
            required
          />
        </div>

        {error && <div className="red-text">{error}</div>}

        <div className="input-field">
          <button
            type="submit"
            className="btn waves-effect waves-light"
            disabled={loading}
          >
            {loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'}
          </button>
        </div>

        <div className="input-field">
          <button
            type="button"
            onClick={handleGoBack}
            className="btn grey lighten-1"
            style={{ marginTop: '10px' }}
          >
            Voltar para a lista de alunos
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlunoForm;
