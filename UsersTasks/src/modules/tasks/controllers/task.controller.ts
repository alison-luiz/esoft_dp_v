import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../../../shared/helpers/api-erros";
import { TasksStatuses } from "../../../shared/utils/enums/tasks-statuses.enum";
import { categoryRepository } from "../../categories/category.repository";
import { userRepository } from "../../users/user.repository";
import { taskTypeRepository } from "../repositories/task-type.repository";
import { taskRepository } from "../repositories/task.repository";

export class TaskController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await taskRepository.find();

      return res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const task = await taskRepository.findOne({
        where: { id: Number(id) },
      });

      if (!task) {
        throw new NotFoundError("Task not found");
      }

      return res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, taskTypeId, status, categoryId } = req.body;

      if (!title || !description || !taskTypeId || !status) {
        throw new BadRequestError("All fields are required");
      }

      const taskType = await taskTypeRepository.findOne({
        where: { id: taskTypeId },
      });

      if (!taskType) {
        throw new NotFoundError("Task type not found");
      }

      let category;

      if (categoryId) {
        category = await categoryRepository.findOne({
          where: { id: categoryId },
        });
  
        if (!category) {
          throw new NotFoundError("Category not found");
        }
      }

      const user = await userRepository.findOneBy({ id: req.user.id });

      const conclusionDate =  status === TasksStatuses.CANCELED || status === TasksStatuses.DONE ? new Date() : undefined;

      const createdTask = await taskRepository.save({
        title: title,
        description: description,
        taskTypeId: taskTypeId,
        status: status,
        creationDate: new Date(),
        conclusionDate: conclusionDate,
        user: user || undefined,
        category: category,
      });

      const task = await taskRepository.findOne({
        where: { id: createdTask.id },
      });

      return res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, description, taskTypeId, status, categoryId } = req.body;

      if (!title || !description || !taskTypeId || !status) {
        throw new BadRequestError("All fields are required");
      }

      const task = await taskRepository.findOne({
        where: { id: Number(id) },
        relations: ["user", "category"],
      });

      if (!task) {
        throw new NotFoundError("Task not found");
      }

      if (task.user.id !== req.user.id) {
        throw new BadRequestError("You can't update this task");
      }

      const taskType = await taskTypeRepository.findOne({
        where: { id: taskTypeId },
      });

      if (!taskType) {
        throw new NotFoundError("Task type not found");
      }

      if (!Object.values(TasksStatuses).includes(status)) {
        throw new BadRequestError("Invalid status");
      }

      let category;

      if (categoryId) {
        category = await categoryRepository.findOne({
          where: { id: categoryId },
        });
  
        if (!category) {
          throw new NotFoundError("Category not found");
        }
      }

      await taskRepository.update(
        { id: Number(id) },
        {
          title: title,
          description: description,
          taskTypeId: taskTypeId,
          status: status,
          category: category,
        }
      );
      
      const updatedTask = await taskRepository.findOne({
        where: { id: Number(id) },
      });

      return res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const task = await taskRepository.findOne({
        where: { id: Number(id) },
        relations: ["user"],
      });

      if (!task) {
        throw new NotFoundError("Task not found");
      }

      if (task.user.id !== req.user.id) {
        throw new BadRequestError("You can't delete this task");
      }

      await taskRepository.delete({ id: Number(id) });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
