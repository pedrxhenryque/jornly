import { db } from "../db.js";

export const usuarioModel = {
  listarTodos() {
    return db.prepare("SELECT * FROM usuarios").all();
  },

  buscarPorId(id) {
    return db.prepare("SELECT * FROM usuarios WHERE id = ?").get(id) || null;
  },

  buscarPorEmail(email) {
    return (
      db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email) || null
    );
  },

  inserir({ nome, email, senha }) {
    const r = db
      .prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)")
      .run(nome, email ?? null, senha ?? null);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, { nome, email }) {
    db.prepare("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?").run(
      nome,
      email,
      id,
    );
    return this.buscarPorId(id);
  },

  deletar(id) {
    const r = db.prepare("DELETE FROM usuarios WHERE id = ?").run(id);
    return r.changes > 0;
  },
};
