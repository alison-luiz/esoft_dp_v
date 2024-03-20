import { Router } from 'express'
import bookController from './src/books/book.controller'

const routes = Router()
routes.get('/health-check')
routes.get('/books', bookController.findAll)
routes.get('/books/:id', bookController.findOne)
routes.post('/books', bookController.create)
routes.put('/books/:id', bookController.update)
routes.delete('/books/:id', bookController.delete)

export {
    routes
}

