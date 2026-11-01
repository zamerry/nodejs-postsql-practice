import {Router} from "express"
import AuthorsController from "../controllers/authors.controller.js";
import BooksController from "../controllers/books.controller.js";

const router = new Router()

router.post('/create_author', AuthorsController.create_author)
router.get('/get_all_authors', AuthorsController.get_all_authors)
router.get('/get_one_author/:id', AuthorsController.get_one_author)
router.put('/update_author', AuthorsController.update_author)
router.delete('/delete_author/:id', AuthorsController.delete_author)

router.get('/join', AuthorsController.join_query)
router.get('/get_query', AuthorsController.get_query)
router.get('/max', AuthorsController.get_max_price)
router.post('/reduce/:id', AuthorsController.reduce_price)
router.post('/plusplus', AuthorsController.plusplus)

export default router