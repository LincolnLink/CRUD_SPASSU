import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlunoById } from '../../services/alunoService';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import '../../styles/AlunoPrime.css';

const AlunoDetails = () => {
  const [aluno, setAluno] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const data = await getAlunoById(id);
        setAluno(data);
      } catch (err) {
        console.log("erro: ", err);
        setError('Erro ao carregar os dados do aluno. ');
      }
    };
    fetchAluno();
  }, [id]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="container-prime">
      <Card className="custom-card-prime p-shadow-4">
        <div className="card-header">
          <h3>Dados do Aluno</h3>
        </div>

        {error && <Message severity="error" text={error} />}

        {aluno && (
          <div className="aluno-details">
            <p><strong>Nome:</strong> {aluno.nome}</p>
            <p><strong>Idade:</strong> {aluno.idade}</p>
          </div>
        )}

        <div className="button-container mt3">
          <Button
            label="Voltar"
            icon="pi pi-arrow-left"
            className="p-button-rounded"
            onClick={handleGoBack}
          />
        </div>
      </Card>
    </div>
  );
};

export default AlunoDetails;
