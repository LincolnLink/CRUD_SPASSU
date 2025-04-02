import { useState, useEffect } from 'react';
import { getAlunosPaginado } from '../services/alunoService';

const useAlunos = (lazyParams) => {
  const [alunos, setAlunos] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      try {
        const pageNumber = Math.floor(lazyParams.first / lazyParams.rows) + 1;
        const data = await getAlunosPaginado(pageNumber, lazyParams.rows);
        setAlunos(data.items);
        setTotalRecords(data.totalRecords);
      } catch (error) {
        console.error("Erro ao carregar alunos", error);
      }
      setLoading(false);
    };

    fetchAlunos();
  }, [lazyParams]);

  return { alunos, totalRecords, loading, setAlunos };
};

export default useAlunos;
