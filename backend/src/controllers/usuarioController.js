import { usuarioService } from "../services/usuarioService.js";

export const usuarioController = {
  listarTodos(req, res) {
    const usuarios = usuarioService
      .listarTodos()
      .map(({ senha, ...resto }) => resto);
    res.json(usuarios);
  },

  criar(req, res) {
    const novo = usuarioService.criar(req.body);
    const { senha, ...semSenha } = novo;
    res.status(201).json(semSenha);
  },

  login(req, res) {
    const usuario = usuarioService.login(req.body);
    res.json(usuario);
  },

  atualizar(req, res) {
    const atualizado = usuarioService.atualizar(
      Number(req.params.id),
      req.body,
    );
    const { senha, ...semSenha } = atualizado;
    res.json(semSenha);
  },

  deletar(req, res) {
    usuarioService.deletar(Number(req.params.id));
    res.status(204).send();
  },
};
