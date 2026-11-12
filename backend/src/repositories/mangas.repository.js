import knex from "../database/knex.js";

class MangaRepository {
    async listar() {
        return await knex("mangas").select("*");
    }

    async buscar(id) {
        return await knex("mangas").where({ id }).first();
    }

    async criar(dados) {
        const [manga] = await knex("mangas")
            .insert(dados)
            .returning("*");

        return manga;
    }

    async atualizar(id, dados) {
        const [manga] = await knex("mangas")
            .where({ id })
            .update(dados)
            .returning("*");

        return manga;
    }

    async excluir(id) {
        return await knex("mangas").where({ id }).del();
    }

    async vender(id, quantidade) {
        return await knex.transaction(async (trx) => {
            const manga = await trx("mangas").where({ id }).first();

            if (!manga || manga.estoque < quantidade) {
                return null;
            }

            const total = Number(manga.preco) * quantidade;

            await trx("mangas")
                .where({ id })
                .decrement("estoque", quantidade);

            const [venda] = await trx("vendas")
                .insert({
                    manga_id: id,
                    quantidade,
                    total
                })
                .returning("*");

            return venda;
        });
    }

    async listarVendas() {
        return await knex("vendas")
            .join("mangas", "vendas.manga_id", "mangas.id")
            .select("vendas.*", "mangas.titulo");
    }
}

export default new MangaRepository();