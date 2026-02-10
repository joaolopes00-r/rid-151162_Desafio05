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
      const { data } = await LivrosService.getLivros();
      console.log("LIVROS:", data);
      setLivros(data);
    } catch (error) {
      console.error("Erro ao buscar livros", error);
    }
  }

  async function deleteLivro(livroId) {
    const valida = confirm(`Você realmente deseja remover o livro de ID: ${livroId}`);
    if (valida) {
      await LivrosService.deleteLivro(livroId);
      alert("Livro removido com sucesso!");
      getLivros();
    }
  }

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <>
      <Header />
      <SubmenuLivros />

      <div className='livros'>
        <h1>Escolha o seu livro</h1>

        <ul>
          {livros.map((livro) => (
            <li key={livro.id}>
              {livro.titulo}
              <span>{livro.editora}</span>

              <div className='botoes'>
                <Link className='btn edit' to={`/livros/edicao/${livro.id}`}>
                  ✏️
                </Link>

                <button className='btn delete' onClick={() => deleteLivro(livro.id)}>
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Livros
