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
    numeroPaginas: '',
    isbn: '',
    editora: ''
  })

  async function createLivro(e) {
    e.preventDefault()

    try {
      await LivrosService.createLivro({
        
        titulo: livro.titulo,
        numeroPaginas: Number(livro.numeroPaginas),
        isbn: livro.isbn,
        editora: livro.editora
      })

      alert('Livro cadastrado com sucesso!')
      navigate('/livros')
    } catch (error) {
      console.error(error)
      const status = error?.response?.status
      const msg = error?.response?.data?.mensagem
      alert(status && msg ? `${status} - ${msg}` : 'Erro ao cadastrar livro')
    }
  }

  return (
    <>
      <Header />
      <SubmenuLivros />

      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>

        <form onSubmit={createLivro}>
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
              required
            />
          </div>

          <div className='form-group'>
            <label>Número de Páginas</label>
            <input
              type="number"
              value={livro.numeroPaginas}
              onChange={e => setLivro({ ...livro, numeroPaginas: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <label>ISBN</label>
            <input
              type="text"
              value={livro.isbn}
              onChange={e => setLivro({ ...livro, isbn: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <label>Editora</label>
            <input
              type="text"
              value={livro.editora}
              onChange={e => setLivro({ ...livro, editora: e.target.value })}
              required
            />
          </div>

          <button type="submit">
            Cadastrar Livro
          </button>
        </form>
      </div>
    </>
  )
}

export default LivrosCadastro