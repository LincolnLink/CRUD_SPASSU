import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const AlunoActionsV2 = ({ id, onDelete }) => {
  return (
    <div className="action-buttons">
      <Link to={`/dadosAlunoPrimeV2/${id}`}>
        <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary p-mr-2" />
      </Link>
      <Link to={`/editarAlunoPrimeV2/${id}`}>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" />
      </Link>
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => onDelete(id)}
      />
    </div>
  );
};

export default AlunoActionsV2;
