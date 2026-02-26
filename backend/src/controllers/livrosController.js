const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

// Helpers para aceitar payload PT-BR ou EN
function normalizeBody(body = {}) {
  const title = body.title ?? body.titulo;
  const pagesRaw = body.pages ?? body.numeroPaginas;
  const isbn = body.isbn;
  const publisher = body.publisher ?? body.editora;

  return {
    title,
    pagesRaw,
    isbn,
    publisher,
  };
}

// ✅ Listar todos
exports.getAll = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM books ORDER BY created_at DESC NULLS LAST'
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro ao buscar livros' });
  }
};

// ✅ Buscar por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUuid(id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }

    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro ao buscar livro' });
  }
};

// ✅ Criar livro
exports.create = async (req, res) => {
  try {
    const { title, pagesRaw, isbn, publisher } = normalizeBody(req.body);
    const pages = Number(pagesRaw);

    // validações mínimas
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ mensagem: 'Título é obrigatório' });
    }
    if (!Number.isInteger(pages) || pages <= 0) {
      return res
        .status(400)
        .json({ mensagem: 'Número de páginas deve ser um inteiro > 0' });
    }
    if (!isbn || typeof isbn !== 'string' || !isbn.trim()) {
      return res.status(400).json({ mensagem: 'ISBN é obrigatório' });
    }
    if (!publisher || typeof publisher !== 'string' || !publisher.trim()) {
      return res.status(400).json({ mensagem: 'Editora é obrigatória' });
    }

    const id = uuidv4();

    // impedir ISBN duplicado (se seu banco tem UNIQUE, isso reforça)
    const existing = await pool.query('SELECT id FROM books WHERE isbn = $1', [
      isbn.trim(),
    ]);
    if (existing.rowCount > 0) {
      return res.status(409).json({ mensagem: 'Já existe um livro com este ISBN' });
    }

    await pool.query(
      'INSERT INTO books (id, title, pages, isbn, publisher) VALUES ($1, $2, $3, $4, $5)',
      [id, title.trim(), pages, isbn.trim(), publisher.trim()]
    );

    return res.status(201).json({ mensagem: 'Livro cadastrado com sucesso', id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro ao cadastrar livro' });
  }
};

// ✅ Atualizar livro
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }

    const { title, pagesRaw, isbn, publisher } = normalizeBody(req.body);

    // pages pode vir undefined (atualização parcial) ou string/number
    const pages = pagesRaw !== undefined ? Number(pagesRaw) : undefined;

    // validações (se veio o campo, valida)
    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ mensagem: 'Título inválido' });
    }
    if (pages !== undefined && (!Number.isInteger(pages) || pages <= 0)) {
      return res.status(400).json({ mensagem: 'Número de páginas inválido' });
    }
    if (isbn !== undefined && (typeof isbn !== 'string' || !isbn.trim())) {
      return res.status(400).json({ mensagem: 'ISBN inválido' });
    }
    if (publisher !== undefined && (typeof publisher !== 'string' || !publisher.trim())) {
      return res.status(400).json({ mensagem: 'Editora inválida' });
    }

    // Verifica se existe
    const exists = await pool.query('SELECT id FROM books WHERE id = $1', [id]);
    if (exists.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    // Atualiza mantendo valores antigos quando campo não foi enviado
    await pool.query(
      `
      UPDATE books
      SET
        title = COALESCE($1, title),
        pages = COALESCE($2, pages),
        isbn = COALESCE($3, isbn),
        publisher = COALESCE($4, publisher)
      WHERE id = $5
      `,
      [
        title !== undefined ? title.trim() : null,
        pages !== undefined ? pages : null,
        isbn !== undefined ? isbn.trim() : null,
        publisher !== undefined ? publisher.trim() : null,
        id,
      ]
    );

    return res.status(200).json({ mensagem: 'Livro atualizado com sucesso' });
  } catch (error) {
    console.error(error);

    // Se ISBN for UNIQUE e tentar duplicar, o Postgres pode retornar 23505
    if (error?.code === '23505') {
      return res.status(409).json({ mensagem: 'ISBN já cadastrado para outro livro' });
    }

    return res.status(500).json({ mensagem: 'Erro ao atualizar livro' });
  }
};

// ✅ Remover livro
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUuid(id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }

    const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    return res.status(200).json({ mensagem: 'Livro removido com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro ao remover livro' });
  }
};