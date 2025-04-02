import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { 
  getAlunoComFotoById,
  createAlunoComFoto,
  updateAlunoComFoto
} from '../../services/alunoService';
import UploadFoto from '../UploadFotoPrimeV2/UploadFotoPrimeV2'

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import '../../styles/AlunoPrime.css';

const AlunoPrimeFormV2 = () => {
  const [idAluno, setIdAluno] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [error, setError] = useState('');  
  const [loading, setLoading] = useState(false);
  const [fotoUpdate, setFotoUpdate] = useState(null);
  const [fotoUrl, setFotoUrl] = useState(null);
  const [removeFoto, setRemoveFoto] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const fetchAluno = async () => {
        try {
          const aluno = await getAlunoComFotoById(id);
          if(aluno !== null){
            setIdAluno(aluno.id);
            setNome(aluno.nome);
            setIdade(aluno.idade);
            setFotoUrl(aluno.fotoUrl);                        
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

    const alunoData = new FormData();    
    alunoData.append("nome", nome.trim());
    alunoData.append("idade", idade ? Number(idade) : 0);
    alunoData.append("fotoUpload", fotoUpdate);
    alunoData.append("removeFoto", removeFoto);

    try {
      if (id) {
        alunoData.append("id", idAluno);
        await updateAlunoComFoto(id, alunoData);        
      } else {
        await createAlunoComFoto(alunoData);               
      }
      setLoading(false);
      navigate('/alunoPrimeListV2');
    } catch (err) {
      setLoading(false);      
      setError(err.message || "Erro ao salvar os dados do aluno. Tente novamente.");
    }
  };

  const handleGoBack = () => {
    navigate('/alunoPrimeListV2');
  };

  return (
    <div className="container-prime">
      <Card className="custom-card-prime p-shadow-4">
        <div className="card-header">
          <h3>{id ? 'Editar Aluno' : 'Cadastrar Aluno'}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="col-12 md:col-6 lg:col-6">
              <label htmlFor="nome">Nome:</label>
              <InputText
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  //required
                  className="p-inputtext-sm"
              />
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
            <div className="col-12 md:col-6 lg:col-6">
              <label>Foto do Aluno:</label>
              <UploadFoto 
                onFileSelected={setFotoUpdate}
                existingImage={fotoUrl}
                onRemovePhoto={setRemoveFoto}
              />
            </div>
          </div>
          <div className='grid'>                    
            <div className="col-6 md:col-6 lg:col-6">
              <Button
                type="button"
                label="Voltar"
                icon="pi pi-arrow-left"
                className="p-button p-component p-button-rounded float-left"
                onClick={handleGoBack}
              />
            </div>            
            <div className='col-6 md:col-6 lg:col-6 text-right'>              
              <Button
                  type="submit"
                  label={loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'}
                  icon="pi pi-save"
                  className="p-button-success p-button-rounded float-right"                  
                  loading={loading}                  
              />
            </div>
            <div className='col-12 md:col-12 lg:col-12 '>
              {error && <Message severity="error" text={error} />}
            </div>   
          </div>
        </form>        
        
      </Card>
    </div>
  );
};

export default AlunoPrimeFormV2;
