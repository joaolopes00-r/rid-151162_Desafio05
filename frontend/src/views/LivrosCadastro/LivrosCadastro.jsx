import { useState } from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'
import { useNavigate } from 'react-router-dom'

const LivrosCadastro = () => {

  const navigate = useNavigate()

  const [livro, setLivro] = useState({
    id: '',
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  })

  async function createLivro() {
    try {
      await LivrosService.createLivro({
        titulo: livro.titulo,
        num_paginas: Number(livro.num_paginas),
        isbn: livro.isbn,
        editora: livro.editora
      })

      alert('Livro cadastrado com sucesso!')
      navigate('/livros')

    } catch (error) {
      console.error(error)
      alert('Erro ao cadastrar livro')
    }
  }

  return (
    <>
      <Header />
      <SubmenuLivros />

      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>

        <form>
          {/* ID — apenas visual */}
          <div className='form-group'>
            <label>Id</label>
            <input
              type="text"
              value={livro.id}
              disabled
              placeholder="Gerado automaticamente"
            />
          </div>

          <div className='form-group'>
            <label>Título</label>
            <input
              type="text"
              value={livro.titulo}
              onChange={e => setLivro({ ...livro, titulo: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <label>Número de Páginas</label>
            <input
              type="number"
              value={livro.num_paginas}
              onChange={e => setLivro({ ...livro, num_paginas: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <label>ISBN</label>
            <input
              type="text"
              value={livro.isbn}
              onChange={e => setLivro({ ...livro, isbn: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <label>Editora</label>
            <input
              type="text"
              value={livro.editora}
              onChange={e => setLivro({ ...livro, editora: e.target.value })}
            />
          </div>

          <button type="button" onClick={createLivro}>
            Cadastrar Livro
          </button>
        </form>
      </div>
    </>
  )
}

export default LivrosCadastro
