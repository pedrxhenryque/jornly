import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Cadastro from "./components/Cadastro";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Detalhe from "./components/Detalhe";
import Perfil from "./components/Perfil";
import "./App.css";

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const salvo = localStorage.getItem("usuarioLogado");
    return salvo ? JSON.parse(salvo) : null;
  });

  function handleLogin(usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    setUsuarioLogado(usuario);
  }

  function handleSair() {
    localStorage.removeItem("usuarioLogado");
    setUsuarioLogado(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/feed" element={<Feed usuarioLogado={usuarioLogado} />} />
        <Route path="/noticia/:id" element={<Detalhe />} />
        <Route
          path="/perfil"
          element={<Perfil usuarioLogado={usuarioLogado} onSair={handleSair} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
