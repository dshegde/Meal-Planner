/** @module Models/User */
import TypeORM from "typeorm";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { Recipes } from "./recipes";
import { RecipeIngredientRel } from "./recipe_ingredient_rel";
import { ShoppingList } from "./shopping_list";

/**
 *  Class representing Ingredients table
 */
@TypeORM.Entity()
export class Ingredients extends TypeORM.BaseEntity {
  @TypeORM.PrimaryGeneratedColumn()
  id: number;

  @TypeORM.Column({
    length: 100,
    type: "varchar",
  })
  ingName: string;

  @TypeORM.OneToMany((type) => ShoppingList, (sl: ShoppingList) => sl.ing)
  slId: TypeORM.Relation<ShoppingList[]>;

  @TypeORM.OneToMany(
    (type) => RecipeIngredientRel,
    (rpi: RecipeIngredientRel) => rpi.recipe
  )
  rpIngRel: TypeORM.Relation<RecipeIngredientRel[]>;
}
