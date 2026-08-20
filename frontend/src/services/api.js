const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/everything";

const MAPA_CATEGORIAS = {
  Tecnologia: "technology",
  Política: "politics",
  Economia: "business",
  Esportes: "sports",
  Ciência: "science",
  Cultura: "entertainment",
};

export async function buscarNoticias(categorias) {
  const chamadas = categorias.map((cat) => {
    const termo = MAPA_CATEGORIAS[cat] || cat;
    return fetch(
      `${BASE_URL}?q=${encodeURIComponent(termo)}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`,
    ).then((resp) => {
      if (!resp.ok) throw new Error("Falha ao carregar notícias.");
      return resp.json();
    });
  });

  const resultados = await Promise.all(chamadas);
  return resultados.flatMap((r) => r.articles);
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function cadastrarUsuario(dados) {
  const resp = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.erro || "Erro ao cadastrar.");
  return corpo;
}

export async function fazerLogin(email, senha) {
  const resp = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.erro || "Erro ao entrar.");
  return corpo;
}

export async function atualizarUsuario(id, dados) {
  const resp = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.erro || "Erro ao atualizar.");
  return corpo;
}

export async function deletarUsuario(id) {
  const resp = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
  });
  if (!resp.ok) throw new Error("Erro ao deletar conta.");
  return true;
}

export async function traduzirTexto(texto) {
  if (!texto) return texto;
  try {
    const resp = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt-BR`,
    );
    const dados = await resp.json();
    const traduzido = dados.responseData?.translatedText || texto;

    // Detecta a mensagem de limite excedido e devolve o original nesse caso
    if (traduzido.toUpperCase().includes("MYMEMORY WARNING")) {
      return texto;
    }
    return traduzido;
  } catch {
    return texto;
  }
}
