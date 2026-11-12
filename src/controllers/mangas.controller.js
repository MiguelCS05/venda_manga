import mangaService from "../services/manga.service.js";

class MangaController {
    async listar(req, res) {
        const mangas = await mangaService.listar();
        res.json(mangas);
    }

    async buscar(req, res) {
        const manga = await mangaService.buscar(req.params.id);
        res.json(manga);
    }

    async criar(req, res) {
        const manga = await mangaService.criar(req.body);
        res.status(201).json(manga);
    }

    async atualizar(req, res) {
        const manga = await mangaService.atualizar(req.params.id, req.body);
        res.json(manga);
    }

    async excluir(req, res) {
        await mangaService.excluir(req.params.id);
        res.json({ mensagem: "Mangá excluído com sucesso" });
    }

    async vender(req, res) {
        try {
            const venda = await mangaService.vender(
                req.params.id,
                Number(req.body.quantidade)
            );

            res.status(201).json(venda);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    async listarVendas(req, res) {
        const vendas = await mangaService.listarVendas();
        res.json(vendas);
    }
}

export default new MangaController();