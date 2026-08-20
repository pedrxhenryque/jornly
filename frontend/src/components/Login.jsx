import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { fazerLogin } from "../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const usuario = await fazerLogin(email, senha);
      onLogin(usuario);
      navigate("/feed");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="brand">
        jorn<span>ly</span>
      </div>
      <div className="auth-card">
        <h1>Entrar</h1>
        <p className="sub">Acesse seu feed personalizado.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
            />
          </div>
          <div className="field">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {erro && <p className="error-msg">{erro}</p>}
          <button className="primary-btn" type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="switch-text">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
