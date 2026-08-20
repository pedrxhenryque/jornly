import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { buscarNoticias, traduzirTexto } from "../services/api";

function Feed({ usuarioLogado }) {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioLogado) {
      navigate("/login");
      return;
    }
    setCarregando(true);
    setErro("");
    buscarNoticias(usuarioLogado.categorias || ["Tecnologia", "Política"])
      .then(async (lista) => {
        const traduzidas = await Promise.all(
          lista.map(async (n) => ({
            ...n,
            title: await traduzirTexto(n.title),
          })),
        );
        setNoticias(traduzidas);
      })
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, [usuarioLogado, navigate]);

  if (!usuarioLogado) {
    return null;
  }

  const categorias = usuarioLogado.categorias || ["Tecnologia", "Política"];
  const todasCategorias = [
    "Tecnologia",
    "Política",
    "Economia",
    "Esportes",
    "Ciência",
  ];

  const noticiasFiltradas = noticias.filter(
    (n) =>
      n.title?.toLowerCase().includes(busca.toLowerCase()) ||
      n.description?.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          jorn<span>ly</span>
        </div>

        <div className="nav-label">Navegação</div>
        <ul className="nav-list">
          <li className="active">Feed</li>
          <li onClick={() => navigate("/perfil")}>Perfil</li>
        </ul>

        <div className="nav-label">Categorias</div>
        <ul className="cat-list">
          {todasCategorias.map((cat) => (
            <li key={cat} className={categorias.includes(cat) ? "on" : ""}>
              {cat}
            </li>
          ))}
        </ul>

        <div className="avatar-mini">
          <div className="circle"></div>
          <div>
            <div className="name">{usuarioLogado.nome}</div>
            <div className="email">{usuarioLogado.email}</div>
          </div>
        </div>
      </aside>

      <div className="main-col">
        <div className="search-box">
          <span>⌕</span>
          <input
            placeholder="Buscar notícias..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <h1 className="page-title">Seu feed</h1>
        <p className="page-sub">Baseado nas categorias selecionadas.</p>

        {carregando && <p>Carregando notícias...</p>}

        {erro && !carregando && (
          <div className="empty-state">
            <p>{erro}</p>
            <button
              className="ghost-btn"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erro && noticiasFiltradas.length === 0 && (
          <div className="empty-state">
            <p>
              {busca
                ? "Nenhuma notícia encontrada para sua busca."
                : "Nenhuma notícia encontrada para suas categorias."}
            </p>
          </div>
        )}

        {!carregando && !erro && noticiasFiltradas.length > 0 && (
          <div className="grid">
            {noticiasFiltradas.map((n, i) => (
              <Link
                className="card"
                to={`/noticia/${i}`}
                key={i}
                state={{ noticia: n }}
              >
                <div className="thumb"></div>
                <span className="cat">{n.source?.name}</span>
                <h3>{n.title}</h3>
                <p>{n.description}</p>
                <div className="meta">
                  <span>{n.source?.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Feed;
