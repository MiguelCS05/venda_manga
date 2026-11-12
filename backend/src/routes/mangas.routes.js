import express from "express";
import mangaController from "../controllers/mangas.controller.js";

const router = express.Router();

router.get("/", (req, res) => mangaController.listar(req, res));
router.get("/vendas", (req, res) => mangaController.listarVendas(req, res));
router.get("/:id", (req, res) => mangaController.buscar(req, res));

router.post("/", (req, res) => mangaController.criar(req, res));
router.post("/:id/vender", (req, res) => mangaController.vender(req, res));

router.put("/:id", (req, res) => mangaController.atualizar(req, res));
router.delete("/:id", (req, res) => mangaController.excluir(req, res));

export default router;