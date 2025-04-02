import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import useAlunos from '../../hooks/useAlunos';
import { deleteAluno } from '../../services/alunoService'; 
import AlunoActionsV2 from './AlunoActionsV2';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import '../../styles/AlunoPrime.css';
import { API_URL_FOTO } from '../../services/config'
import noPhoto from '../../assets/no-photo.jpg';


const AlunoPrimeListV2 = () => {
  const [lazyParams, setLazyParams] = useState({ first: 0, rows: 10 });
  const { alunos, totalRecords, loading, setAlunos } = useAlunos(lazyParams);
  
  // Opções do Dropdown para número de linhas por página
  const rowOptions = [
    { label: '3', value: 3 },
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
  ];

  // Atualiza o número de linhas por página
  const onRowsChange = (e) => {
    setLazyParams({ ...lazyParams, rows: e.value });
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Tem certeza que deseja excluir este aluno?');
    if (!isConfirmed) return;

    try {
      await deleteAluno(id);
      setAlunos(alunos.filter(aluno => aluno.id !== id));     
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      alert('Erro ao excluir o aluno. Tente novamente mais tarde.');
    }
  };

  const imageBodyTemplate = (data) => {
    if (data.fotoUrl) {
      const isAbsoluteUrl = data.fotoUrl.startsWith("http");
      return <img
      src={isAbsoluteUrl ? data.fotoUrl : `${API_URL_FOTO}/${data.fotoUrl}`} 
      alt={data.nome} className="w-6rem h-6rem shadow-2 border-round" />;
    }else{
      return <img 
      src={noPhoto}
      alt="sem foto" className="w-6rem h-6rem shadow-2 border-round" />;
    }
  };
  
  return (

    <div className="container-prime">      
      <Card className="custom-card-prime">        
        <div className="card-header">
          <h3>Lista de Alunos</h3>
          <Link to="/criaAlunoPrimeV2">
            <Button label="Criar Novo" icon="pi pi-plus" className="p-button-success p-button-rounded" />
          </Link>
        </div>
        
        <div className="dropdown-container-prime">
          <label htmlFor="rows" className="p-mr-2">Linhas por Página: </label>
          <Dropdown
            id="rows"
            value={lazyParams.rows}
            options={rowOptions}
            onChange={onRowsChange}
            placeholder="Selecione as linhas"
            className="p-dropdown"
          />
        </div>
        <div>
          <p>Total: {totalRecords}</p> 
        </div>
        
        <div className="table-container-prime">
          <DataTable
            value={alunos}
            lazy
            paginator
            totalRecords={totalRecords}
            loading={loading}
            first={lazyParams.first}
            rows={lazyParams.rows}
            onPage={(e) => setLazyParams(e)}
            className="custom-table-prime"
            responsiveLayout="scroll"
            rowHover
          >       
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column field="nome" header="Nome" />
            <Column field="idade" header="Idade" />

            <Column
              body={(rowData) => (
                <AlunoActionsV2 id={rowData.id} onDelete={handleDelete} />
              )}
              header="Ações"
              style={{ textAlign: 'right' }}
            />            
          </DataTable>
        </div>
      </Card>
    </div>
  );
};

export default AlunoPrimeListV2;
