import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Cadastro from "./components/Cadastro";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Detalhe from "./components/Detalhe";
import Perfil from "./components/Perfil";
import { usuariosIniciais, noticiasIniciais } from "./data/noticias";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  function cadastrar(novo) {
    const proximoId = Math.max(0, ...usuarios.map((u) => u.id)) + 1;
    setUsuarios([...usuarios, { id: proximoId, categorias: [], ...novo }]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/cadastro"
          element={<Cadastro usuarios={usuarios} onCadastrar={cadastrar} />}
        />
        <Route
          path="/login"
          element={<Login usuarios={usuarios} onLogin={setUsuarioLogado} />}
        />
        <Route
          path="/feed"
          element={
            <Feed usuarioLogado={usuarioLogado} noticias={noticiasIniciais} />
          }
        />
        <Route
          path="/noticia/:id"
          element={<Detalhe noticias={noticiasIniciais} />}
        />
        <Route
          path="/perfil"
          element={
            <Perfil
              usuarioLogado={usuarioLogado}
              onSair={() => setUsuarioLogado(null)}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
