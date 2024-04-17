import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.categorie)
  tasks: Task[];
}