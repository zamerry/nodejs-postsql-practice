import database from "../db/db.js";

class BooksController {
    async create_author(req, res) {
        try {
            const {title, publication_year, price, author_id} = req.body
            const create = await database.query('insert into books (title, publication_year, price, author_id) values ($1, $2, $3,$4) returning *', [title, publication_year, price, author_id])
            return res.status(200).json(create.rows[0])
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "скорее всего ошибка на сервере"})
        }
    }

    async get_all_authors(req, res) {
        try {
            const get_all = await database.query('select * from books')
            return res.status(200).json({
                message: "все данные с таблицы books",
                data: get_all.rows
            })
        } catch (e) {
            return res.status(500).json({message: "скорее всего ошибка на сервере"})
        }
    }

    async get_one_author(req, res) {
        try {
            const {id} = req.params

            const get_one = await database.query('select * from books where id = $1', [id])
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
            const {id, title, publication_year, price, author_id} = req.body
            const update = await database.query('update authors set title = $1, publicatiopn_year = $2, price = $3, author_id = $4 where id = $5 returning *', [title, publication_year, price, author_id, id])
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
            const delete_one = await database.query('delete from books where id = $1', [id])
            return res.status(200).json({
                message: "данные по указанному id удалены"
            })

        } catch (e) {
            return res.status(500).json({message: "скорее всего ошибка на сервере"})
        }
    }
}

export default new BooksController()