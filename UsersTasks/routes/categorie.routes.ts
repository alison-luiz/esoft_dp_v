import { Router } from 'express'
import { CategorieController } from '../src/modules/categories/categorie.controller'
import { authMiddleware } from '../src/shared/middlewares/auth.middleware'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const categorieRoutes = Router()

categorieRoutes.use(authMiddleware)

categorieRoutes.get('/categories', new CategorieController().findAll)
categorieRoutes.get('/categories/:id', new CategorieController().findById)
categorieRoutes.post('/categories', new CategorieController().create)
categorieRoutes.put('/categories/:id', new CategorieController().update)
categorieRoutes.delete('/categories/:id', new CategorieController().delete)

categorieRoutes.use(errorMiddleware)

export { categorieRoutes }

