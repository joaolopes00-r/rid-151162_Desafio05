import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { useParams, useNavigate } from 'react-router-dom'
import { LivrosService } from '../../api/LivrosService'

const LivrosEdicao = () => {
  const navigate = useNavigate()
  const { livroId } = useParams() 

  const [livro, setLivro] = useState({
    id: '',
    titulo: '',
    numeroPaginas: '',
    isbn: '',
    editora: ''
  })

  async function getLivro() {
    if (!livroId) {
      alert('ID não informado na URL (livroId).')
      return
    }

    try {
      const { data } = await LivrosService.getLivro(livroId)

      setLivro({
        id: data.id,
        titulo: data.titulo ?? data.title ?? '',
        numeroPaginas: String(data.numeroPaginas ?? data.pages ?? ''),
        isbn: data.isbn ?? '',
        editora: data.editora ?? data.publisher ?? ''
      })
    } catch (error) {
      console.error(error)
      const status = error?.response?.status
      const msg = error?.response?.data?.mensagem
      alert(status && msg ? `${status} - ${msg}` : 'Erro ao buscar livro')
    }
  }

  async function editLivro(e) {
    e.preventDefault()

    if (!livroId) {
      alert('ID não informado na URL (livroId).')
      return
    }

    try {
      const body = {
        titulo: livro.titulo,
        numeroPaginas: Number(livro.numeroPaginas),
        isbn: livro.isbn,
        editora: livro.editora
      }

      const { data } = await LivrosService.updateLivro(livroId, body) 
      alert(data?.mensagem ?? 'Livro atualizado com sucesso!')
      navigate('/livros')
    } catch (error) {
      console.error(error)
      const status = error?.response?.status
      const msg = error?.response?.data?.mensagem
      alert(status && msg ? `${status} - ${msg}` : 'Erro ao atualizar livro')
    }
  }

  useEffect(() => {
    getLivro()
    
  }, [livroId])

  return (
    <>
      <Header />
      <SubmenuLivros />

      <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>

        <form onSubmit={editLivro}>
          <div className='form-group'>
            <label>Id</label>
            <input type="text" disabled value={livro.id} />
          </div>

          <div className='form-group'>
            <label>Título</label>
            <input
              type="text"
              value={livro.titulo}
              onChange={(e) => setLivro({ ...livro, titulo: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <label>Número de Páginas</label>
            <input
              type="number"
              value={livro.numeroPaginas}
              onChange={(e) => setLivro({ ...livro, numeroPaginas: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <label>ISBN</label>
            <input
              type="text"
              value={livro.isbn}
              onChange={(e) => setLivro({ ...livro, isbn: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <label>Editora</label>
            <input
              type="text"
              value={livro.editora}
              onChange={(e) => setLivro({ ...livro, editora: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <button type="submit">Atualizar Livro</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default LivrosEdicao