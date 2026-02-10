# projeto-react-api-node
Projeto em React com API simples em Node.
# 📚 Biblioteca Online — API Node.js + React

Projeto desenvolvido para o desafio de integração **Back-end (Node.js + PostgreSQL)** com **Front-end (React + Vite)**, simulando um sistema de biblioteca online com cadastro, listagem, edição e remoção de livros.

---

## 🎯 Objetivo do Projeto

Desenvolver uma **API REST em Node.js** integrada a um **front-end em React**, permitindo a comunicação completa entre cliente e servidor para gerenciamento de livros.

O sistema contempla um **CRUD completo**:

* Criar livros
* Listar livros
* Buscar livro por ID
* Editar livros
* Deletar livros

---

## 🛠️ Tecnologias Utilizadas

### 🔙 Back-end

* Node.js
* Express
* PostgreSQL
* pg (node-postgres)
* dotenv
* cors

### 🔜 Front-end

* React
* Vite
* React Router DOM
* Axios
* Sass

---

## 📂 Estrutura do Projeto

```
biblioteca-online/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── livrosController.js
│   │   ├── routes/
│   │   │   └── livrosRoutes.js
│   │   ├── config/
│   │   │   └── database.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── LivrosService.js
│   │   ├── views/
│   │   ├── components/
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Configuração do Banco de Dados

### 📌 PostgreSQL

Crie o banco e a tabela com o seguinte script:

```sql
CREATE DATABASE livros_db;

CREATE TABLE livros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  num_paginas INTEGER NOT NULL,
  isbn VARCHAR(50) NOT NULL,
  editora VARCHAR(255) NOT NULL
);
```

---

## 🔐 Variáveis de Ambiente

### Backend (`backend/.env`)

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=livros_db
DB_PORT=5432
PORT=3000
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
```

⚠️ Após alterar variáveis de ambiente, reinicie as aplicações.

---

## ▶️ Como Executar o Projeto

### 1️⃣ Backend

```bash
cd backend
npm install
npm run dev
```

Servidor rodando em:

```
http://localhost:3000
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação rodando em:

```
http://localhost:5173
```

---

## 🔗 Rotas da API

### 📘 Livros

| Método | Rota        | Descrição              |
| ------ | ----------- | ---------------------- |
| GET    | /livros     | Lista todos os livros  |
| GET    | /livros/:id | Busca livro por ID     |
| POST   | /livros     | Cadastra um novo livro |
| PUT    | /livros/:id | Atualiza um livro      |
| DELETE | /livros/:id | Remove um livro        |

### 📥 Exemplo de Payload (POST / PUT)

```json
{
  "titulo": "Livro Exemplo",
  "num_paginas": 250,
  "isbn": "123456789",
  "editora": "Editora Exemplo"
}
```

---

## 🖥️ Funcionalidades do Front-end

* Tela de listagem de livros
* Tela de cadastro de livros
* Tela de edição de livros
* Exclusão de livros
* Integração completa com API
* Campo ID exibido conforme layout (gerado automaticamente pelo banco)

---

## ✅ Critérios Atendidos

✔ API funcionando localmente
✔ Rotas GET, POST, PUT e DELETE
✔ Integração completa Front-end + Back-end
✔ Persistência de dados com PostgreSQL
✔ Organização de código e arquitetura

---

## 🧪 Testes

As rotas da API podem ser testadas utilizando ferramentas como:

* Insomnia
* Postman



