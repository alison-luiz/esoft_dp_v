import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategorieColors } from "../../../shared/utils/enums/categorie-colors.enum";
import { Task } from "../../tasks/entities/task.entity";

@Entity()
export class Categorie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "enum", enum: CategorieColors })
  color: CategorieColors;

  @OneToMany(() => Task, (task) => task.categorie)
  tasks: Task[];
}