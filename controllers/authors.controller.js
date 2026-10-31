import database from '../db/db.js'

class AuthorsController {


    // самоделка
    async join_query(req, res) {
        try {
            const get_two_dt = await database.query('select a.id, a.full_name, a.country, b.title, b.publication_year, b.price, b.author_id from authors a join books b on a.id = b.author_id')
            return res.status(200).json(get_two_dt.rows)
        }   catch (e) {
            console.log(e)
            return res.status(500).json({message: "ошибка"})
        }
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