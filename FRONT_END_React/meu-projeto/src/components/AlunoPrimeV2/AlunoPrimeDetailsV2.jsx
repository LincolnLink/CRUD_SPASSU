import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlunoComFotoById } from '../../services/alunoService';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import '../../styles/AlunoPrime.css';

import { API_URL } from '../../services/config'

const AlunoPrimeDetailsV2 = () => {
  const [aluno, setAluno] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const data = await getAlunoComFotoById(id);
        setAluno(data);

        if (data.fotoUrl) {
          const isAbsoluteUrl = data.fotoUrl.startsWith("http");
          setPreview(isAbsoluteUrl ? data.fotoUrl : `${API_URL}/pasta-fotos/${data.fotoUrl}`);
        } else {
          setPreview(null);
        }
      } catch (err) {
        console.log("erro: ", err);
        setError('Erro ao carregar os dados do aluno. ');
      }
    };
    fetchAluno();
  }, [id]);

  const handleGoBack = () => {
    navigate('/alunoPrimeListV2');
  };

  return (
    <div className="container-prime">
      <Card className="custom-card-prime p-shadow-4">
        <div className="card-header">
          <h3>Dados do Aluno</h3>
        </div>

        <div className='grid'>
          <div className='col-12 md:col-6 lg:col-6'>
            {aluno && (
              <div className="aluno-details">
                <p><strong>Nome:</strong> {aluno.nome}</p>
                <p><strong>Idade:</strong> {aluno.idade}</p>
              </div>
            )}
          </div>
          <div className='col-12 md:col-6 lg:col-6'>

          {preview && (
            <>
              <img src={preview} 
              alt="Preview"
              height="300px"
              className="img-prime"
              />          
            </>
          )}

          </div>          
          <div className='col-12'>
            <div className="button-container mt3">
              <Button
                  label="Voltar"
                  icon="pi pi-arrow-left"
                  className="p-button-rounded"
                  onClick={handleGoBack}
                />
            </div>          
            {error && <Message severity="error" text={error} />}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AlunoPrimeDetailsV2;
