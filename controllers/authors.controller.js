import database from '../db/db.js'
import pool from "../db/db.js";

class AuthorsController {


    // самоделка
    async join_query(req, res) {
        try {
            const get_two_dt = await database.query('select a.id, a.full_name, a.country, b.title, b.publication_year, b.price, b.author_id from authors a join books b on a.id = b.author_id')
            return res.status(200).json(get_two_dt.rows)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "ошибка"})
        }
    }

    async get_max_price(req, res) {
        const get_max = await database.query('select title, price as "дефолт цена", sum(price) as "в сумме" from books group by title, price order by price desc limit 3')
        return res.json(get_max.rows)
    }

    async reduce_price(req, res) {
        // return async function (book_id, book_price) {
        let client
        try {

            const id = parseInt(req.params.id, 10)

            if (isNaN(id)) {
                return res.json({message: "error"})
            }

            client = await pool.connect()

            await client.query('begin')

            const change_price = await client.query(
                'update books set price = price * 1.12 where id = $1 and (price * 1.12) < 13000 returning *', [id]
            )

            if (change_price.rows.length === 0) {
                return res.json({message: "цена превысило 13000"})
            }

            await client.query('commit')

            return res.json({
                message: "успех",
                data: change_price.rows
            })

        } catch (e) {
            console.log(e)
            if (client) {
                await client.query('rollback')
            }
            return res.json({message: "ошибка"})
        } finally {
            if (client) {
                client.release()
            }
        }
        // }
    }

    async plusplus(req, res) {
        const first = Number(req.query.first)
        const second = Number(req.query.second)

        if (isNaN(first) || isNaN(second)) {
            return res.json({message: "error"})
        }

        const result = await database.query(
            'select get_sum($1::numeric, $2::numeric)', [first, second]
        )

        return res.json({
            message: "успех",
            result: result.rows[0]
        })

    }


    async get_query(req, res) {
        const {author_name: full_name, author_country: country} = req.query

        const get_this = await database.query('select * from authors where full_name ilike $1 and country ilike $2', [full_name, country])

        return res.status(200).json({
            message: "ok",
            data: get_this.rows
        })

    }

    async create_author(req, res) {
        try {
            const {full_name, country} = req.body
            const create = await database.query('insert into authors (full_name, country) values ($1,$2) returning *', [full_name, country])
            return res.status(200).json(create.rows[0])
        } catch (e) {
            return res.status(500).json({message: "скорее всего ошибка на сервере"})
        }
    }

    async get_all_authors(req, res) {
        try {
            const get_all = await database.query('select * from authors')
            return res.status(200).json({
                message: "все данные с таблицы authors",
                data: get_all.rows
            })
        } catch (e) {
            return res.status(500).json({message: "скорее всего ошибка на сервере"})
        }
    }

    async get_one_author(req, res) {
        try {
            const {id} = req.params

            const get_one = await database.query('select * from authors where id = $1', [id])
            return res.status(200).json({
                message: "результат поиска по указанному id",
                data: get_one.rows[0]
            })
        } catch (e) {
            return res.status(500).json({message: "скорее всего ошибка на сервере"})
        }
    }

    async update_author(req, res) {
        try {
            const {id, full_name, country} = req.body
            const update = await database.query('update authors set full_name = $1, country = $2 where id = $3 returning *', [full_name, country, id])
            return res.status(200).json({
                message: "данные обновлены",
                data: update.rows[0]
            })
        } catch (e) {
            return res.status(500).json({message: "скорее всего ошибка на сервере"})
        }
    }

    async delete_author(req, res) {
        try {
            const {id} = req.params
            const delete_one = await database.query('delete from authors where id = $1', [id])
            return res.status(200).json({
                message: "данные по указанному id удалены"
            })

        } catch (e) {
            return res.status(500).json({message: "скорее всего ошибка на сервере"})
        }
    }
}

export default new AuthorsController()