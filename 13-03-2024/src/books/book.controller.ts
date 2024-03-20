import { Request, Response } from 'express'
import { BookService } from './book.service'

class BookController {
    async findAll(req: Request, res: Response) {
        const books = await new BookService().findAll()
        return res.json(books)
    }

    async findOne(req: Request, res: Response) {
        const book = await new BookService().findOne(req.params.id)
        return res.json(book)
    }

    async create(req: Request, res: Response) {
        const book = await new BookService().create(req.body)
        return res.json(book)
    }

    async update(req: Request, res: Response) {
        const book = await new BookService().update(req.params.id, req.body)
        return res.json(book)
    }

    async delete(req: Request, res: Response) {
        const book = await new BookService().delete(req.params.id)
        return res.json(book)
    }
}

export default new BookController()