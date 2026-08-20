import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync("banco.db");

db.exec("PRAGMA foreign_keys = ON;");

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT NOT NULL,
    email TEXT UNIQUE,
    senha TEXT
  );
`);
