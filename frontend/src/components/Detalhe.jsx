import { useLocation, useNavigate } from "react-router";

function Detalhe() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const noticia = state?.noticia;

  if (!noticia) return <p>Notícia não encontrada.</p>;

  return (
    <div className="detail-wrap">
      <button className="back-link" onClick={() => navigate("/feed")}>
        ← Voltar ao feed
      </button>
      <span className="detail-cat">{noticia.source?.name}</span>
      <h1>{noticia.title}</h1>
      <p>{noticia.description}</p>
      <a
        className="source-link"
        href={noticia.url}
        target="_blank"
        rel="noreferrer"
      >
        Ler matéria completa na fonte ↗
      </a>
    </div>
  );
}
export default Detalhe;
