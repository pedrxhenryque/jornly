import { useNavigate } from "react-router";

function Perfil({ usuarioLogado, onSair }) {
  const navigate = useNavigate();
  if (!usuarioLogado) {
    navigate("/login");
    return null;
  }
  return (
    <div className="app">
      <div className="main-col">
        <h1 className="page-title">Perfil</h1>
        <p>
          {usuarioLogado.nome} — {usuarioLogado.email}
        </p>
        <button
          className="logout-btn"
          onClick={() => {
            onSair();
            navigate("/login");
          }}
        >
          Sair da conta
        </button>
      </div>
    </div>
  );
}
export default Perfil;
