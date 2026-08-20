import express from "express";
import cors from "cors";
import usuariosRouter from "./routes/usuarios.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRouter);

app.get("/", (req, res) => {
  res.json({
    api: "Jornly API",
    versao: "1.0.0",
    rotas: ["/usuarios"],
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ erro: err.message || "Erro interno" });
});

export default app;
