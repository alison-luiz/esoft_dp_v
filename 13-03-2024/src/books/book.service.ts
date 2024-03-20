import bookModel from './book.schema'

export class BookService {

    async findAll() {
        try {
            return bookModel.find()
        } catch (error) {
            console.error('Error occurred while getting books', error)
        }
    }

    async findOne(id: string) {
        try {
            return bookModel.findById(id)
        } catch (error) {
            console.error('Error occurred while getting book', error)
        }
    }

    async create(book: any) {
        try {
            const createdBook = bookModel.create(book)
            return createdBook
        } catch (error) {
            console.error('Error occurred while creating book', error)
        }
    }

    async update(id: string, book: any) {
        try {
            const updatedBook = bookModel.findByIdAndUpdate(id, book, { new: true })
            return updatedBook
        } catch (error) {
            console.error('Error occurred while updating book', error)
        }
    }

    async delete(id: string) {
        try {
            const deletedBook = bookModel.findByIdAndDelete(id)
            return deletedBook
        } catch (error) {
            console.error('Error occurred while deleting book', error)
        }
    }
}
