import { Router } from 'express'
import { UserController } from '../src/modules/users/user.controller'
import { authMiddleware } from '../src/shared/middlewares/auth.middleware'

const routes = Router()

routes.get('/health-check', (req, res) => res.send('OK'))
routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)

routes.use(authMiddleware)

// fazer um health-check para verificar se o token está válido
routes.get('/health-check-2', (req, res) => res.send('OK'))

routes.get('/profile', new UserController().getProfile)

export {
    routes
}

