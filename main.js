import express from 'express'
import authors_router from './routers/authors.router.js'
import books_router from './routers/books.router.js'
import dotenv from 'dotenv'

dotenv.config()

const port = 5000

const app = express()
app.use(express.json())

app.use('/database', authors_router)
app.use('/database', books_router)

app.listen(port, () => {
    console.log("сервер работает")
})