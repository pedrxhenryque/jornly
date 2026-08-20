import { usuarioModel } from "../models/usuario.js";

export const usuarioService = {
  listarTodos() {
    return usuarioModel.listarTodos();
  },

  criar({ nome, email, senha }) {
    if (!nome) {
      const err = new Error('Campo "nome" é obrigatório');
      err.status = 400;
      throw err;
    }
    if (!email || !senha) {
      const err = new Error('Campos "email" e "senha" são obrigatórios');
      err.status = 400;
      throw err;
    }
    const existente = usuarioModel.buscarPorEmail(email);
    if (existente) {
      const err = new Error("Este e-mail já está cadastrado");
      err.status = 409;
      throw err;
    }
    return usuarioModel.inserir({ nome, email, senha });
  },

  login({ email, senha }) {
    if (!email || !senha) {
      const err = new Error('Campos "email" e "senha" são obrigatórios');
      err.status = 400;
      throw err;
    }
    const usuario = usuarioModel.buscarPorEmail(email);
    if (!usuario || usuario.senha !== senha) {
      const err = new Error("E-mail ou senha inválidos");
      err.status = 401;
      throw err;
    }
    const { senha: _, ...semSenha } = usuario;
    return semSenha;
  },

  atualizar(id, { nome, email }) {
    const usuario = usuarioModel.buscarPorId(id);
    if (!usuario) {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    }
    if (!nome || !email) {
      const err = new Error('Campos "nome" e "email" são obrigatórios');
      err.status = 400;
      throw err;
    }
    return usuarioModel.atualizar(id, { nome, email });
  },

  deletar(id) {
    const usuario = usuarioModel.buscarPorId(id);
    if (!usuario) {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    }
    return usuarioModel.deletar(id);
  },
};
