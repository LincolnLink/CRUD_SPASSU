import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { getAlunoById, createAluno, updateAluno } from '../services/alunoService';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import '../styles/AlunoPrimeList.css';

const AlunoPrimeForm = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Pega o ID da URL (para edição)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const fetchAluno = async () => {
        try {
          const aluno = await getAlunoById(id);
          if(aluno !== null){
            setNome(aluno.nome);
            setIdade(aluno.idade);            
          }         
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

    // if (!nome || !idade) {
    //   setError('Nome e Idade são obrigatórios.');
    //   return;
    // }

    setLoading(true);
    setError("");
    const alunoData = {
      nome: nome.trim(),
      idade: idade ? Number(idade) : 0
    };
    try {
      if (id) {       
        await updateAluno(id, { id, ...alunoData });
      } else {        
        await createAluno(alunoData);
      }
      setLoading(false);
      navigate('/AlunoPrimeList');
    } catch (err) {
      setLoading(false);      
      setError(err.message || "Erro ao salvar os dados do aluno. Tente novamente.");
    }
  };

  const handleGoBack = () => {
    navigate('/AlunoPrimeList'); // Redireciona para a lista de alunos
  };

  return (
    <div className="container-prime">
      <Card className="custom-card-prime p-shadow-4">
        <div className="card-header">
          <h3>{id ? 'Editar Aluno' : 'Cadastrar Aluno'}</h3>
        </div>

        <form onSubmit={handleSubmit}> 

          <div className="p-d-flex p-flex-wrap p-mb-3 form-prime">
            <div className="p-field p-col-12 p-md-6 p-mr-2 input-prime">
              <label htmlFor="nome">Nome:</label>
              <InputText
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                //required
                className="p-inputtext-sm"
              />
            </div>

            <div className="p-field p-col-12 p-md-6 input-prime">
              <label htmlFor="idade">Idade:</label>
              <InputText
                id="idade"
                type="number"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                // required
                className="p-inputtext-sm"
              />
            </div>
          </div>

          <div className="p-field p-mb-3" >
            <Button
              type="submit"
              label={loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'}
              icon="pi pi-save"
              className="p-button-success p-button-rounded"
              loading={loading}
              style={{ float: 'right' }}
            />
            <Button
              type="button"
              label="Voltar"
              icon="pi pi-arrow-left"
              className="p-button p-component p-button-rounded"
              onClick={handleGoBack}
              style={{ float: 'right' }}
            />
          </div>
        </form>
        <br />
        <div className="mt3">
          {error && <Message severity="error" text={error} />}
        </div>
        
      </Card>
    </div>
  );
};

export default AlunoPrimeForm;
