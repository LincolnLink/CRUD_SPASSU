import axios from 'axios';

const API_URL = 'https://localhost:7047/api/alunos';

export const getAlunos = async () => {
  const response = await axios.get(`${API_URL}/ObterTodos`);
  return response.data;
};

export const getAlunoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter aluno', error);
  }
};

export const createAluno = async (aluno) => {
  try {
    const response = await axios.post(`${API_URL}/Adicionar`, aluno);
    return response.data;
  } catch (error) {
    console.log('erro:', error)
    throw new Error('Erro ao criar aluno');
  }
};

export const updateAluno = async (id, aluno) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, aluno);
    return response.data;
  } catch (error) {
    console.log('erro:', error)
    throw new Error('Erro ao atualizar aluno');   
  }
};

export const deleteAluno = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
