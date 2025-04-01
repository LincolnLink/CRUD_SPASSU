import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//prime
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import './App.css';

import AlunoList from './components/Aluno/AlunoList';
import AlunoForm from './components/Aluno/AlunoForm';
import AlunoPrimeList from './components/AlunoPrime/AlunoPrimeList';
import AlunoPrimeForm from './components/AlunoPrime/AlunoPrimeForm';
import AlunoPrimeListV2 from './components/AlunoPrimeV2/AlunoPrimeListV2';
import AlunoPrimeFormV2 from './components/AlunoPrimeV2/AlunoPrimeFormV2';
import AlunoPrimeDetailsV2 from './components/AlunoPrimeV2/AlunoPrimeDetailsV2';

const App = () => {

  const items = [
    { label: 'Lista de Alunos', icon: 'pi pi-users', command: () => window.location.href = '/' },
    { label: 'Lista de Alunos Prime', icon: 'pi pi-users', command: () => window.location.href = '/AlunoPrimeList' },
    { label: 'Lista de Alunos Prime V2', icon: 'pi pi-users', command: () => window.location.href = '/AlunoPrimeListV2' }
  
  ];

  return (
    <Router>
      {/* Menu responsivo do PrimeReact */}
      <Menubar model={items} className="custom-menubar" />

      {/* Conteúdo principal (corrigindo espaçamento) */}
      <div className="">
        <Routes>
          <Route path="/" element={<AlunoList />} />
          <Route path="/criar" element={<AlunoForm />} />
          <Route path="/editar/:id" element={<AlunoForm />} />

          <Route path="/AlunoPrimeList" element={<AlunoPrimeList />} />
          <Route path="/criaAlunoPrime" element={<AlunoPrimeForm />} />
          <Route path="/editarAlunoPrime/:id" element={<AlunoPrimeForm />} />

          <Route path="/alunoPrimeListV2" element={<AlunoPrimeListV2 />} />
          <Route path="/criaAlunoPrimeV2" element={<AlunoPrimeFormV2 />} />
          <Route path="/editarAlunoPrimeV2/:id" element={<AlunoPrimeFormV2 />} />
          <Route path="/dadosAlunoPrimeV2/:id" element={<AlunoPrimeDetailsV2 />} />
        </Routes>
      </div>
    </Router>

  );
};

export default App;
