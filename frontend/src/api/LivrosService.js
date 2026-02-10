import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export class LivrosService {

  static getLivros() {
    return api.get("/livros");
  }

  static getLivro(id) {
    return api.get(`/livros/${id}`);
  }

  static createLivro(body) {
    return api.post("/livros", body);
  }

  static updateLivro(id, body) {
    return api.put(`/livros/${id}`, body);
  }

  static deleteLivro(id) {
    return api.delete(`/livros/${id}`);
  }
}
