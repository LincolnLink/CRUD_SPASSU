import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlunoList from './components/AlunoList';
import AlunoForm from './components/AlunoForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlunoList />} />
        <Route path="/criar" element={<AlunoForm />} />
        <Route path="/editar/:id" element={<AlunoForm />} />
      </Routes>
    </Router>
  );
};

export default App;
