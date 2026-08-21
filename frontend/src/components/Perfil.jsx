import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { atualizarUsuario, deletarUsuario } from "../services/api";

function Perfil({ usuarioLogado, onSair, onAtualizarUsuario }) {
  const navigate = useNavigate();
  const [nome, setNome] = useState(usuarioLogado?.nome || "");
  const [email, setEmail] = useState(usuarioLogado?.email || "");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);

  useEffect(() => {
    if (!usuarioLogado) {
      navigate("/login");
    }
  }, [usuarioLogado, navigate]);

  if (!usuarioLogado) {
    return null;
  }

  const categorias = usuarioLogado.categorias || ["Tecnologia", "Política"];
  const todasCategorias = ["Tecnologia", "Política", "Economia", "Esportes"];

  async function handleSalvar(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setCarregando(true);
    try {
      const usuarioAtualizado = await atualizarUsuario(usuarioLogado.id, {
        nome,
        email,
      });
      onAtualizarUsuario({ ...usuarioLogado, ...usuarioAtualizado });
      setSucesso("Perfil atualizado com sucesso!");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleDeletar() {
    const confirmar = window.confirm(
      "Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.",
    );
    if (!confirmar) return;
    try {
      await deletarUsuario(usuarioLogado.id);
      onSair();
      navigate("/login");
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          jorn<span>ly</span>
        </div>

        <div className="nav-label">Navegação</div>
        <ul className="nav-list">
          <li onClick={() => navigate("/feed")}>Feed</li>
          <li className="active">Perfil</li>
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
        <h1 className="page-title">Perfil</h1>
        <p className="page-sub">Gerencie sua conta e preferências.</p>

        <div className="nav-label" style={{ marginTop: 8 }}>
          Seus temas
        </div>
        <ul className="cat-list" style={{ marginBottom: 24 }}>
          {todasCategorias.map((cat) => (
            <li key={cat} className={categorias.includes(cat) ? "on" : ""}>
              {cat}
            </li>
          ))}
        </ul>

        <div className="nav-label">Preferências</div>
        <div className="settings-row">
          <div>
            <div className="settings-label">Notificações push</div>
            <div className="settings-desc">
              Alertas de manchetes importantes
            </div>
          </div>
          <div
            className={`switch ${notificacoes ? "on" : ""}`}
            onClick={() => setNotificacoes(!notificacoes)}
          >
            <div className="knob"></div>
          </div>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-label">Modo escuro</div>
            <div className="settings-desc">Ajusta o tema do app</div>
          </div>
          <div
            className={`switch ${modoEscuro ? "on" : ""}`}
            onClick={() => setModoEscuro(!modoEscuro)}
          >
            <div className="knob"></div>
          </div>
        </div>

        <div className="nav-label" style={{ marginTop: 24 }}>
          Editar dados
        </div>
        <form onSubmit={handleSalvar} style={{ maxWidth: 360, marginTop: 12 }}>
          <div className="field">
            <label>Nome</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="field">
            <label>E-mail</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {erro && <p className="error-msg">{erro}</p>}
          {sucesso && <p className="success-msg">{sucesso}</p>}
          <button className="primary-btn" type="submit" disabled={carregando}>
            {carregando ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>

        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <button
            className="logout-btn"
            onClick={() => {
              onSair();
              navigate("/login");
            }}
          >
            Sair da conta
          </button>
          <button className="logout-btn" onClick={handleDeletar}>
            Deletar conta
          </button>
        </div>
      </div>
    </div>
  );
}
export default Perfil;
