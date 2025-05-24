# SIGA - Sistema de Gestão Acadêmica (Backend)

API RESTful para o sistema acadêmico **SIGA**, desenvolvida com **Node.js**, **Express** e **MongoDB**, com foco em gerenciamento de **alunos, cursos, matérias, notas, presença e autenticação JWT**.

---

## 📋 Requisitos

* Node.js **>= 14.x**
* MongoDB **>= 4.x**
* NPM ou Yarn

---

## 🚀 Instalação

1. **Clone o repositório:**

```bash
git clone https://seu-repositorio/siga-backend.git
cd siga-backend
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3. **Inicie o servidor:**

```bash
# Modo produção
npm start
# ou
yarn start
```

---

## 📁 Estrutura do Projeto

```
siga-backend/
├── config/           # Configurações (database, JWT, upload)
├── controllers/      # Lógica das rotas (aluno, curso, matéria, auth)
├── middlewares/      # Autenticação, validação, tratamento de erros
├── models/           # Schemas do Mongoose (User, Course, Subject)
├── routes/           # Definição das rotas da API
├── utils/            # Funções auxiliares (ex: validador de CPF)
├── .env              # Exemplo de variáveis de ambiente
├── package.json      # Scripts e dependências
└── server.js         # Ponto de entrada da aplicação
```

---

## 🔐 Endpoints da API

### 📌 Autenticação

* `POST /api/auth/login` – Login com CPF e senha

### 👤 Alunos

* `POST /api/student` – Cadastro de aluno
* `GET /api/student` – Buscar aluno por ID (requer token)

### 🎓 Cursos

* `POST /api/courses` – Criar curso
* `GET /api/courses` – Listar cursos

### 📚 Matérias

* `POST /api/subjects` – Criar nova matéria
* `GET /api/subjects` – Listar matérias

### 🕵️ Admin
---

## 🔒 Segurança

* Hash de senhas com **bcrypt**
* Autenticação via **JWT**
* Validação de CPF no backend
* Upload seguro de arquivos (tamanho e tipo)
* Middleware de **CORS** configurado
* Campos sensíveis como senha não são expostos

---

## 👨‍💻 Desenvolvimento

Para contribuir:

1. Crie uma nova branch: `git checkout -b minha-feature`
2. Faça suas alterações e commits
3. Envie para o repositório: `git push origin minha-feature`
4. Crie um **Pull Request**
