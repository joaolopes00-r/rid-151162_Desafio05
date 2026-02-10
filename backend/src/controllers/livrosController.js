const pool = require('../config/database');

/**
 * Criar livro
 */
exports.criarLivro = async (req, res) => {
  const { titulo, num_paginas, isbn, editora } = req.body;

  try {
    const novoLivro = await pool.query(
      `INSERT INTO livros (titulo, num_paginas, isbn, editora)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [titulo, num_paginas, isbn, editora]
    );

    res.status(201).json(novoLivro.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar livro' });
  }
};

/**
 * Listar livros
 */
exports.listarLivros = async (req, res) => {
  try {
    const livros = await pool.query('SELECT * FROM livros');
    res.json(livros.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar livros' });
  }
};

/**
 * Editar livro
 */
exports.editarLivro = async (req, res) => {
  const { id } = req.params;
  const { titulo, num_paginas, isbn, editora } = req.body;

  try {
    await pool.query(
      `UPDATE livros
       SET titulo = $1,
           num_paginas = $2,
           isbn = $3,
           editora = $4
       WHERE id = $5`,
      [titulo, num_paginas, isbn, editora, id]
    );

    res.sendStatus(204);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao editar livro' });
  }
};

/**
 * Deletar livro
 */
exports.deletarLivro = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM livros WHERE id = $1', [id]);
    res.sendStatus(204);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao deletar livro' });
  }
};
