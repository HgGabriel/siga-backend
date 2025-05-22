# SIGA - Sistema Acadêmico (Backend)

API REST para o sistema acadêmico SIGA, desenvolvida com Node.js, Express e MongoDB.

## Requisitos

- Node.js >= 14.x
- MongoDB >= 4.x
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://seu-repositorio/siga-backend.git
cd siga-backend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Crie a pasta uploads:
```bash
mkdir uploads
```

5. Inicie o servidor:
```bash
# Modo desenvolvimento
npm run dev
# ou
yarn dev

# Modo produção
npm start
# ou
yarn start
```

## Estrutura do Projeto

```
siga-backend/
├── config/           # Configurações (database, auth, multer)
├── controllers/      # Controladores da aplicação
├── middlewares/     # Middlewares personalizados
├── models/          # Modelos do Mongoose
├── routes/          # Rotas da API
├── uploads/         # Pasta para upload de arquivos
├── utils/           # Utilitários
├── .env             # Variáveis de ambiente
├── .env.example     # Exemplo de variáveis de ambiente
├── package.json     # Dependências e scripts
└── server.js        # Ponto de entrada da aplicação
```

## Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login do aluno

### Aluno
- `GET /api/student` - Obtém dados do aluno autenticado

### Foto de Perfil
- `POST /api/profile/photo` - Upload de foto
- `GET /api/profile/photo` - Obtém URL da foto
- `DELETE /api/profile/photo` - Remove foto

## Variáveis de Ambiente

```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações do MongoDB
MONGODB_URI=mongodb://localhost:27017/siga-backend

# Configurações do JWT
JWT_SECRET=seu_segredo_super_secreto
JWT_EXPIRATION=24h

# Outras configurações
UPLOAD_MAX_SIZE=5242880 # 5MB em bytes
```

## Segurança

- Senhas são armazenadas com hash usando bcrypt
- Autenticação via JWT
- Validação de CPF
- Upload de arquivos restrito a imagens
- Limite de tamanho para uploads
- CORS configurado
- Dados sensíveis não são retornados nas respostas

## Desenvolvimento

Para contribuir com o projeto:

1. Crie uma branch para sua feature
2. Faça commit das suas alterações
3. Push para a branch
4. Crie um Pull Request

## Licença

Este projeto está sob a licença MIT. 