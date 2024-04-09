import { AppDataSource } from "../../shared/database/database.config";
import { Categorie } from "./entities/categorie.entity";

export const categorieRepository = AppDataSource.getRepository(Categorie)
