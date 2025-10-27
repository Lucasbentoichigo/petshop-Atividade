import { Router } from "express";
import * as animaisController from './../controllers/animaisController.js'

const router = Router();

//Rota GetAll em /
router.get("/", animaisController.listarTodos);
// Rota do GetById
router.get("/:id", animaisController.listarUm)
//Rota do Post
router.post("/", animaisController.criar)
// Rota Delete
router.delete("/:id", animaisController.apagar)
//Rota update
router.put("/:id", animaisController.atualizar)

export default router;