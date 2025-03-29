import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AlunoList from './components/AlunoList';
import AlunoForm from './components/AlunoForm';

import AlunoPrimeList from './components/AlunoPrimeList';
import AlunoPrimeForm from './components/AlunoPrimeForm';

//prime
import { Menubar } from 'primereact/menubar';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css'; // Para os ícones

import './App.css';

const App = () => {

  const items = [
    { label: 'Lista de Alunos', icon: 'pi pi-users', command: () => window.location.href = '/' },
    { label: 'Lista de Alunos Prime', icon: 'pi pi-users', command: () => window.location.href = '/AlunoPrimeList' }
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
        </Routes>
      </div>
    </Router>

  );
};

export default App;
