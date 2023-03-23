/** @module Models/User */
import TypeORM from "typeorm";
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
import { Recipes } from "./recipes";

import { User } from "./user";

/**
 *  Class representing user table
 */
@TypeORM.Entity()
export class MealPlans extends TypeORM.BaseEntity {
  @TypeORM.PrimaryGeneratedColumn()
  id: number;

  @TypeORM.Column()
  mealType: string;

  @TypeORM.Column()
  dayOfWeek: string;

  // user
  @TypeORM.ManyToOne((type) => User, (user: User) => user.mps, {
    //adding an MealPlans will also add associated User if it is new, somewhat useless in this example
    cascade: true,
    // if we delete a User, also delete their MealPlans
    onDelete: "CASCADE",
  })
  user: TypeORM.Relation<User>;

  // recipe
  @TypeORM.ManyToOne((type) => Recipes, (recipe: Recipes) => recipe.ids, {
    //adding an MealPlans will also add associated recipe if it is new, somewhat useless in this example
    cascade: true,
    // if we delete a recipe, also delete their MealPlans
    onDelete: "CASCADE",
  })
  recipe: TypeORM.Relation<Recipes>;

  @TypeORM.CreateDateColumn()
  created_at: string;

  @TypeORM.UpdateDateColumn()
  updated_at: string;
}
