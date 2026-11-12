import mangaRepository from "../repositories/manga.repository.js";

class MangaService {
    async listar() {
        return await mangaRepository.listar();
    }

    async buscar(id) {
        return await mangaRepository.buscar(id);
    }

    async criar(dados) {
        return await mangaRepository.criar(dados);
    }

    async atualizar(id, dados) {
        return await mangaRepository.atualizar(id, dados);
    }

    async excluir(id) {
        return await mangaRepository.excluir(id);
    }

    async vender(id, quantidade) {
        if (quantidade <= 0) {
            throw new Error("Quantidade inválida");
        }

        const venda = await mangaRepository.vender(id, quantidade);

        if (!venda) {
            throw new Error("Mangá não encontrado ou estoque insuficiente");
        }

        return venda;
    }

    async listarVendas() {
        return await mangaRepository.listarVendas();
    }
}

export default new MangaService();