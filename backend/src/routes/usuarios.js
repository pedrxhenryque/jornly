import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";

const router = Router();

router.get("/", usuarioController.listarTodos);
router.post("/", usuarioController.criar);
router.post("/login", usuarioController.login);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.deletar);

export default router;
