/** @module Models/User */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { MealPlans } from "./meal_plans";

import { User } from "./user";

/**
 *  Class representing user table
 */
@Entity()
export class Recipes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipeName: string;

  @Column()
  dietType: string;

  @Column()
  cuisine: string;

  @Column({
    length: 500,
    type: "varchar",
  })
  description: string;

  @OneToMany((type) => MealPlans, (mp: MealPlans) => mp.recipe)
  ids: Relation<MealPlans[]>;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
