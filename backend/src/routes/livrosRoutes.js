const express = require('express');
const router = express.Router();
const controller = require('../controllers/livrosController');

router.post('/livros', controller.criarLivro);
router.get('/livros', controller.listarLivros);
router.put('/livros/:id', controller.editarLivro);
router.delete('/livros/:id', controller.deletarLivro);

module.exports = router;
