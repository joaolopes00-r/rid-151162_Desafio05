# 📚 Biblioteca Online — API + Frontend

Sistema fullstack de biblioteca online com **Node.js + Express + PostgreSQL** no backend e **React + Vite** no frontend.
O projeto implementa um CRUD completo de livros com integração ponta a ponta.

---

## 🚀 Tecnologias

### Backend

* Node.js
* Express
* PostgreSQL
* UUID (pgcrypto)
* Nodemon

### Frontend

* React
* Vite
* Axios
* React Router DOM

---

## 📁 Estrutura do Projeto

```
/
├── backend
└── frontend
```

---

# ⚙️ Configuração do Banco de Dados

## 1️⃣ Criar banco no PostgreSQL

```sql
CREATE DATABASE biblioteca_db;

\c biblioteca_db;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  pages INT NOT NULL,
  isbn VARCHAR(50) NOT NULL UNIQUE,
  publisher VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

✅ O ID é gerado automaticamente pelo PostgreSQL.

---

# 🔐 Variáveis de Ambiente

## Backend

Copie:

```
backend/.env.example → backend/.env
```

Exemplo:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=biblioteca_db
```

---

## Frontend

Copie:

```
frontend/.env.example → frontend/.env
```

Exemplo:

```
VITE_API_URL=http://localhost:3000
```

---

# ▶️ Como Executar

## Backend

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

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend em:

```
http://localhost:5173
```

---

# 🔌 Endpoints da API

Base URL:

```
http://localhost:3000/livros
```

---

## 📥 Listar livros

```
GET /livros
```

---

## 🔍 Buscar livro por ID

```
GET /livros/:id
```

---

## ➕ Criar livro

```
POST /livros
```

### Body

```json
{
  "title": "Livro Exemplo",
  "pages": 250,
  "isbn": "123456789",
  "publisher": "Editora Exemplo"
}
```

---

## ✏️ Atualizar livro

```
PUT /livros/:id
```

---

## ❌ Deletar livro

```
DELETE /livros/:id
```

---

# 🧪 Testes rápidos via cURL

## Listar

```bash
curl http://localhost:3000/livros
```

## Criar

```bash
curl -X POST http://localhost:3000/livros \
  -H "Content-Type: application/json" \
  -d '{"title":"Teste","pages":100,"isbn":"111222333","publisher":"XPTO"}'
```

## Buscar por ID

```bash
curl http://localhost:3000/livros/<id>
```

## Atualizar

```bash
curl -X PUT http://localhost:3000/livros/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Teste Editado","pages":120,"isbn":"111222333","publisher":"XPTO"}'
```

## Deletar

```bash
curl -X DELETE http://localhost:3000/livros/<id>
```

---

# ✅ Requisitos Atendidos

* ✔ CRUD completo
* ✔ GET por ID implementado
* ✔ Integração frontend ↔ backend
* ✔ UUID automático
* ✔ Tratamento de erros
* ✔ Uso de variáveis de ambiente
* ✔ Projeto executável

---

# 👨‍💻 Autor

João Victor RID-151162

---

# 📌 Observações

* Não versionar arquivos `.env`
* Usar sempre os `.env.example`
* Certifique-se de que o PostgreSQL esteja rodando antes de iniciar o backend

---

✅ 
