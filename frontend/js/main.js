// js/main.js
import { registerStudent, login, getAllStudents} from './api.js';
// Importa a função com o novo nome
import { displayResponse, displayError, setupNavigation } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Chama a função de navegação atualizada
    setupNavigation();

    // O restante do código permanece EXATAMENTE O MESMO
    const alunoForm = document.getElementById('alunoForm');
    const respostaCadastro = document.getElementById('respostaCadastro');
    const loginForm = document.getElementById('loginForm');
    const respostaLogin = document.getElementById('respostaLogin');
    const btnListarAlunos = document.getElementById('btnListarAlunos');
    const respostaListaAlunos = document.getElementById('respostaListaAlunos');

    alunoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(alunoForm);
        const alunoData = Object.fromEntries(formData.entries());

        try {
            const result = await registerStudent(alunoData);
            displayResponse(respostaCadastro, result, 'Aluno cadastrado com sucesso!');
            alunoForm.reset();
        } catch (error) {
            displayError(respostaCadastro, error);
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const loginData = Object.fromEntries(formData.entries());

        try {
            const result = await login(loginData);
            displayResponse(respostaLogin, result, 'Login realizado com sucesso!');
            loginForm.reset();
        } catch (error) {
            displayError(respostaLogin, error);
        }
    });

    btnListarAlunos.addEventListener('click', async () => {
        try {
            // Limpa a área de resposta antes de buscar
            respostaListaAlunos.innerHTML = 'Buscando...';
            respostaListaAlunos.className = 'response-area';
            
            const result = await getAllStudents();
            displayResponse(respostaListaAlunos, result, 'Lista de alunos carregada com sucesso!');
        } catch (error) {
            displayError(respostaListaAlunos, error);
        }
    });
});