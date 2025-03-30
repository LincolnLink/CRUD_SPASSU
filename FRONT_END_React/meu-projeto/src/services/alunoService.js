import axios from 'axios';

const API_URL = 'https://localhost:7047/api/alunos';

export const getAlunos = async () => {
  const response = await axios.get(`${API_URL}/ObterTodos`);
  return response.data;
};

export const getAlunosPaginado = async (pageNumber = 1, pageSize = 10) => {
  try{
  const response = await axios.get(`${API_URL}/ObterTodosPaginado`, {
    params: { pageNumber, pageSize },
  });
  return response.data;
  } catch(error){
    throw new Error('Erro ao buscar alunos', error)
  }
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

    console.log("valor: ", response); 
    
    return response.data;
       
  } catch (error) {    
    if (error.response) {      
      const mensagens = error.response.data?.errors 
        ? Object.values(error.response.data.errors).flat().join(" | ") 
        : error.response.data?.mensagem || "Erro desconhecido no servidor.";

      throw new Error(mensagens);
    }
    throw new Error('Erro ao salvar os dados do aluno.');
  }
};

export const updateAluno = async (id, aluno) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, aluno);
    return response.data;
  } catch (error) {
    if (error.response) {      
      const mensagens = error.response.data?.errors 
        ? Object.values(error.response.data.errors).flat().join(" | ") 
        : error.response.data?.mensagem || "Erro desconhecido no servidor.";

      throw new Error(mensagens);
    }
    throw new Error('Erro ao atualizar os dados do aluno.');
  }
};

export const deleteAluno = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
