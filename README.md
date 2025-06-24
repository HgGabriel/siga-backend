

# SIGA - Ambiente de Desenvolvimento Acadêmico

Ambiente de desenvolvimento completo para o sistema acadêmico **SIGA**. Este repositório contém uma **API RESTful** (backend) e uma **interface de testes** (frontend), ambos totalmente containerizados com **Docker** e orquestrados com **Docker Compose**.


## ✨ Sobre o Projeto

O objetivo deste projeto é fornecer um ambiente de desenvolvimento robusto e portátil para a gestão acadêmica. A solução é dividida em três serviços principais gerenciados pelo Docker Compose, que funcionam de forma integrada:

  * **Backend**: Uma API RESTful construída com Node.js e Express, responsável por toda a lógica de negócio, incluindo gerenciamento de alunos, cursos, matérias e autenticação.
  * **Frontend**: Uma interface de testes estática (HTML, CSS, JS) servida com `live-server`, que permite interagir e testar os endpoints da API de forma visual e com recarregamento automático.
  * **Database**: Uma instância do MongoDB que persiste todos os dados da aplicação.



## 🚀 Tecnologias Utilizadas

  * **Backend**: Node.js, Express.js, Mongoose, JWT, Bcrypt
  * **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
  * **Banco de Dados**: MongoDB
  * **DevOps**: Docker, Docker Compose


## 📋 Pré-requisitos

Para rodar este projeto, você precisará ter instalado em sua máquina:

  * [Git](https://git-scm.com/)
  * [Docker](https://www.docker.com/products/docker-desktop/) e **Docker Compose**

## 🚀 Como Rodar o Ambiente

Siga os passos abaixo para ter o ambiente completo rodando em sua máquina:

1.  **Clone o repositório:**

    ```bash
    git clone https://seu-repositorio/siga-backend.git
    cd siga-backend
    ```

2.  **Crie o arquivo de variáveis de ambiente:**
    Navegue até a pasta `backend` e crie o arquivo `.env`.


    > **Nota:** O arquivo `.env` contém segredos e configurações específicas do ambiente. O modelo fornecido já está configurado para funcionar com o Docker Compose.

3.  **Inicie os containers:**
    Na raiz do projeto (onde está o `docker-compose.yml`), execute o comando:

    ```bash
    docker-compose up --build
    ```

    > O argumento `--build` é necessário na primeira vez para construir as imagens Docker.

4.  **Acessando os Serviços:**
    Após os containers iniciarem, os serviços estarão disponíveis nos seguintes endereços:

      * **Interface de Testes (Frontend):** `http://localhost:5500`
      * **API (Backend):** `http://localhost:3000`


## 📁 Estrutura de Pastas

A estrutura foi organizada para separar claramente as responsabilidades do backend e do frontend.

```
siga-backend/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env            # (Criado por você, ignorado pelo Git)
│   ├── .gitignore
│   ├── Dockerfile      # Dockerfile do Backend
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── Dockerfile      # Dockerfile do Frontend
│   └── index.html
│
└── docker-compose.yml  # Orquestra todos os serviços
```


## 🌐 Endpoints da API

A tabela abaixo resume os principais endpoints disponíveis na API.

| Método HTTP | Endpoint                | Descrição                                 | Autenticação? |
| :---------- | :---------------------- | :---------------------------------------- | :------------ |
| `POST`      | `/api/auth/login`       | Realiza o login de um usuário (aluno/admin). | Não           |
| `POST`      | `/api/students`         | Cadastra um novo aluno.                   | Não           |
| `GET`       | `/api/students`         | Lista todos os alunos cadastrados.        | Sim (Admin)   |
| `GET`       | `/api/profile/student`  | Busca os dados do aluno autenticado.      | Sim (Aluno)   |
| `POST`      | `/api/courses`          | Cria um novo curso.                       | Sim (Admin)   |
| `GET`       | `/api/courses`          | Lista todos os cursos.                    | Sim           |
| `POST`      | `/api/subjects`         | Cria uma nova matéria.                    | Sim (Admin)   |
| `GET`       | `/api/subjects`         | Lista todas as matérias.                  | Sim           |
| `GET`       | `/api/admin/profile`    | Busca os dados do admin autenticado.      | Sim (Admin)   |


## 🔒 Considerações de Segurança

  * **Senhas:** Armazenadas com hash utilizando **bcrypt**.
  * **Autenticação:** Gerenciada por **JSON Web Tokens (JWT)**, com tempo de expiração.
  * **Autorização:** Middlewares específicos verificam o `role` do usuário (`aluno` ou `admin`) para proteger rotas.
  * **Validação:** Validações de entrada são aplicadas para garantir a integridade dos dados.
  * **CORS:** Middleware de CORS configurado para permitir requisições apenas de origens autorizadas.
  * **Segredos:** Dados sensíveis (segredos JWT, credenciais de DB) são gerenciados via variáveis de ambiente (`.env`).

-----
