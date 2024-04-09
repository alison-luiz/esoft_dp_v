import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../../shared/helpers/api-erros";
import { categorieRepository } from "./categorie.repository";

export class CategorieController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categorieRepository.find();

      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const categorie = await categorieRepository.findOne({
        where: { id: Number(id) },
      })

      if (!categorie) {
        throw new NotFoundError("Categorie not found")
      }

      return res.status(200).json(categorie);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, color } = req.body;

      if (!name) {
        throw new BadRequestError("Name is required");
      }

      if (!color) {
        throw new BadRequestError("Color is required");
      }

      const categorieAlreadyExists = await categorieRepository.findOne({
        where: { name },
      });

      if (categorieAlreadyExists) {
        throw new BadRequestError("Categorie already exists");
      }

      const categorie = await categorieRepository.save({
        name,
        color,
      });

      return res.status(201).json(categorie);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, color } = req.body;

      if (!name) {
        throw new BadRequestError("Name is required");
      }

      if (!color) {
        throw new BadRequestError("Color is required");
      }

      const categorie = await categorieRepository.findOne({
        where: { id: Number(id) },
      });

      if (!categorie) {
        throw new NotFoundError("Categorie not found");
      }

      const categorieAlreadyExists = await categorieRepository.findOne({
        where: { name },
      });

      if (categorieAlreadyExists && categorieAlreadyExists.id !== Number(id)) {
        throw new BadRequestError("Categorie already exists");
      }

      await categorieRepository.update(Number(id), {
        name,
        color,
      });

      const updatedCategorie = await categorieRepository.findOne({
        where: { id: Number(id) },
      });

      return res.status(200).json(updatedCategorie);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const categorie = await categorieRepository.findOne({
        where: { id: Number(id) },
      });

      if (!categorie) {
        throw new NotFoundError("Categorie not found");
      }

      await categorieRepository.delete(Number(id));

      return res.status(200).json({ message: "Categorie deleted" });
    } catch (error) {
      next(error);
    }
  }
}
