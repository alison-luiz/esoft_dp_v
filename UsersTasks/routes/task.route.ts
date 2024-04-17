import { Router } from 'express'
import { TaskController } from '../src/modules/tasks/controllers/task.controller'
import { authMiddleware } from '../src/shared/middlewares/auth.middleware'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const taskRoutes = Router()

taskRoutes.use(authMiddleware)

taskRoutes.get('/tasks', new TaskController().findAll)
taskRoutes.get('/tasks/:id', new TaskController().findById)
taskRoutes.post('/tasks', new TaskController().create)
taskRoutes.put('/tasks/:id', new TaskController().update)

taskRoutes.use(errorMiddleware)

export { taskRoutes }

