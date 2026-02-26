import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'
import { Link } from "react-router-dom"

const Livros = () => {
  const [livros, setLivros] = useState([])

  async function getLivros() {
    try {
      const { data } = await LivrosService.getLivros()
      console.log("LIVROS:", data)

      
      setLivros(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Erro ao buscar livros", error)
      setLivros([]) 
      alert("Erro ao buscar livros")
    }
  }

  async function deleteLivro(livroId) {
    const valida = window.confirm(`Você realmente deseja remover o livro de ID: ${livroId}?`)
    if (!valida) return

    try {
      const { data } = await LivrosService.deleteLivro(livroId)
      alert(data?.mensagem ?? "Livro removido com sucesso!")
      getLivros()
    } catch (error) {
      console.error("Erro ao remover livro", error)
      const status = error?.response?.status
      const msg = error?.response?.data?.mensagem
      alert(status && msg ? `${status} - ${msg}` : "Erro ao remover livro")
    }
  }

  useEffect(() => {
    getLivros()
  }, [])

  return (
    <>
      <Header />
      <SubmenuLivros />

      <div className='livros'>
        <h1>Escolha o seu livro</h1>

        <ul>
          {livros.length === 0 ? (
            <p>Nenhum livro encontrado.</p>
          ) : (
            livros.map((livro) => (
              <li key={livro.id}>
                {/* ✅ compatível com back EN e front PT */}
                {livro.titulo ?? livro.title}
                <span>{livro.editora ?? livro.publisher}</span>

                <div className='botoes'>
                  <Link className='btn edit' to={`/livros/edicao/${livro.id}`}>
                    ✏️
                  </Link>

                  <button
                    type="button"
                    className='btn delete'
                    onClick={() => deleteLivro(livro.id)}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  )
}

export default Livros