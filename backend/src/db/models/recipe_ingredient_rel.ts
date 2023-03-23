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
import { Ingredients } from "./ingredients";
import { MealPlans } from "./meal_plans";
import { Recipes } from "./recipes";

import { User } from "./user";

/**
 *  Class representing user table
 */
@TypeORM.Entity()
export class RecipeIngredientRel extends TypeORM.BaseEntity {
  @TypeORM.PrimaryGeneratedColumn()
  id: number;

  @TypeORM.ManyToOne((type) => Recipes, (recipe: Recipes) => recipe.rpIngRel, {
    //adding an MealPlans will also add associated recipe if it is new, somewhat useless in this example
    cascade: true,
    // if we delete a recipe, also delete their MealPlans
    onDelete: "CASCADE",
  })
  recipe: TypeORM.Relation<Recipes>;

  @TypeORM.ManyToOne(
    (type) => Ingredients,
    (ing: Ingredients) => ing.rpIngRel,
    {
      //adding an MealPlans will also add associated recipe if it is new, somewhat useless in this example
      cascade: true,
      // if we delete a recipe, also delete their MealPlans
      onDelete: "CASCADE",
    }
  )
  ingredient: TypeORM.Relation<Ingredients>;
}
