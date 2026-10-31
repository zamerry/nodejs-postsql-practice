import {Router} from "express";
import BooksController from "../controllers/books.controller.js";

const router = new Router()

router.post('/create_book', BooksController.create_author)
router.get('/get_all_books', BooksController.get_all_authors)
router.get('/get_one_book/:id', BooksController.get_one_author)
router.put('/update_book', BooksController.update_author)
router.delete('/delete_book/:id', BooksController.delete_author)

export default router