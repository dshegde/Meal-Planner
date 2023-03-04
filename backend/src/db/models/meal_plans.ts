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

import { User } from "./user";

/**
 *  Class representing user table
 */
@Entity()
export class MealPlans extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mealId: number;

  @Column()
  mealType: string;

  @Column()
  recipeId: number;

  @Column()
  dayOfWeek: string;

  // user
  @ManyToOne((type) => User, (user: User) => user.mps, {
    //adding an MealPlans will also add associated User if it is new, somewhat useless in this example
    cascade: true,
    // if we delete a User, also delete their MealPlans
    onDelete: "CASCADE",
  })
  user: Relation<User>;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
