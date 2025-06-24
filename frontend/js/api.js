// js/api.js

const API_BASE_URL = "http://localhost:3000/api";

/**
 * Função genérica para fazer requisições à API.
 * @param {string} endpoint - O endpoint da API (ex: '/student').
 * @param {string} method - O método HTTP (ex: 'POST', 'GET').
 * @param {object} [body=null] - O corpo da requisição.
 * @returns {Promise<any>} - O resultado da requisição em JSON.
 */
async function apiFetch(endpoint, method, body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      // Se a API retornar um erro (status 4xx, 5xx), lança um erro com a mensagem da API
      throw new Error(result.message || "Ocorreu um erro na requisição.");
    }

    // Adiciona o status da resposta ao resultado para uso no UI.
    result.status = response.status;
    return result;
  } catch (error) {
    // Re-lança o erro para ser capturado pelo chamador
    console.error(`Erro na API [${method} ${endpoint}]:`, error);
    throw error;
  }
}

// Exporta funções específicas para cada endpoint
export const registerStudent = (studentData) => {
  // Adiciona campos fixos que o formulário não tem
  const payload = {
    ...studentData,
    role: "aluno",
    materias: [],
  };
  return apiFetch("/student", "POST", payload);
};

export const login = (credentials) => {
  return apiFetch("/auth/login", "POST", credentials);
};

/**
 * Busca a lista de todos os alunos da API.
 * @returns {Promise<any>} A lista de alunos.
 */
export const getAllStudents = () => {
  // A rota GET /students foi definida no backend
  return apiFetch("/student/all", "GET");
};
