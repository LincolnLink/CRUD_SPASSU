import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import { getAlunosPaginado, deleteAluno } from '../services/alunoService';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import '../styles/AlunoPrimeList.css';

const AlunoPrimeList = () => {
  const [alunos, setAlunos] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lazyParams, setLazyParams] = useState({ first: 0, rows: 10 });

  // Opções do Dropdown para número de linhas por página
  const rowOptions = [
    { label: '3', value: 3 },
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
  ];

  useEffect(() => {
    const pageNumber = Math.floor(lazyParams.first / lazyParams.rows) + 1;
    loadAlunos(pageNumber, lazyParams.rows);
  }, [lazyParams]);
  

  const loadAlunos = async (page, size) => {
    setLoading(true);
    const data = await getAlunosPaginado(page, size);
    setAlunos(data.items);
    setTotalRecords(data.totalRecords);
    setLoading(false);
  };

  // Atualiza o número de linhas por página
  const onRowsChange = (e) => {
    setLazyParams({ ...lazyParams, rows: e.value });
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
        await deleteAluno(id);  // Aqui você deve ter a função para excluir o aluno
        setAlunos(alunos.filter(aluno => aluno.id !== id));
      }
    } catch (error) {
      alert('Erro ao excluir o aluno. Tente novamente mais tarde.', error);
    }
  };

  // Função para gerar o botão de ação de editar
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        {/* Botão de Editar */}
        <Link to={`/editarAlunoPrime/${rowData.id}`}>
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" />
        </Link>

        {/* Botão de Deletar */}
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData.id)}
        />
      </div>
    );
  };

  return (

    <div className="container-prime">
      
      <Card className="custom-card-prime">

        {/* Título e botão dentro de um container flex */}
        <div className="card-header">
          <h3>Lista de Alunos</h3>
          <Link to="/criaAlunoPrime">
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
            <Column field="nome" header="Nome" />
            <Column field="idade" header="Idade" />

            {/* Coluna de Ações */}
            <Column 
              body={actionBodyTemplate} 
              header="Ações"
              headerStyle={{ float: 'right', marginRight: '1em'}}              
              style={{ textAlign: 'right' }}
            />
          </DataTable>
        </div>
      </Card>

    </div>
        
  );
};

export default AlunoPrimeList;
