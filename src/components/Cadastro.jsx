import { useState } from "react";
import { useNavigate, Link } from "react-router";

function Cadastro({ usuarios, onCadastrar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (usuarios.some((u) => u.email === email)) {
      setErro("Este e-mail já está cadastrado.");
      return;
    }
    onCadastrar({ nome, email, senha });
    navigate("/login");
  }

  return (
    <div className="auth-wrap">
      <div className="brand">
        jorn<span>ly</span>
      </div>
      <div className="auth-card">
        <h1>Criar conta</h1>
        <p className="sub">Leva menos de um minuto.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
            />
          </div>
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
          <button className="primary-btn" type="submit">
            Cadastrar
          </button>
        </form>
        <p className="switch-text">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
export default Cadastro;
