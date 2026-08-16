import { useNavigate, Link } from "react-router";

function Feed({ usuarioLogado, noticias }) {
  const navigate = useNavigate();
  if (!usuarioLogado) {
    navigate("/login");
    return null;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          jorn<span>ly</span>
        </div>
        <ul className="nav-list">
          <li className="active">Feed</li>
          <li onClick={() => navigate("/perfil")}>Perfil</li>
        </ul>
      </aside>
      <div className="main-col">
        <h1 className="page-title">Seu feed</h1>
        <p className="page-sub">Olá, {usuarioLogado.nome}!</p>
        <div className="grid">
          {noticias.map((n) => (
            <Link className="card" to={`/noticia/${n.id}`} key={n.id}>
              <span className="cat">{n.categoria}</span>
              <h3>{n.titulo}</h3>
              <p>{n.resumo}</p>
              <div className="meta">
                <span>{n.fonte}</span>
                <span>·</span>
                <span>{n.tempo}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Feed;
