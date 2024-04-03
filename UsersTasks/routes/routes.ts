import { Router } from 'express'
import { UserController } from '../src/modules/users/user.controller'
import { authMiddleware } from '../src/shared/middlewares/auth.middleware'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const routes = Router()

routes.get('/health-check', (req, res) => res.send('OK'))
routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)

routes.use(authMiddleware)

routes.get('/profile', new UserController().getProfile)

routes.use(errorMiddleware)

export { routes }

