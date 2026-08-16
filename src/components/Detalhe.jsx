import { useParams, useNavigate } from "react-router";

function Detalhe({ noticias }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const noticia = noticias.find((n) => n.id === Number(id));

  if (!noticia) return <p>Notícia não encontrada.</p>;

  return (
    <div className="detail-wrap">
      <button className="back-link" onClick={() => navigate("/feed")}>
        ← Voltar ao feed
      </button>
      <span className="detail-cat">{noticia.categoria}</span>
      <h1>{noticia.titulo}</h1>
      <div className="byline">
        <span>{noticia.fonte}</span>
        <span>·</span>
        <span>{noticia.tempo}</span>
      </div>
      <p>{noticia.resumo}</p>
    </div>
  );
}
export default Detalhe;
