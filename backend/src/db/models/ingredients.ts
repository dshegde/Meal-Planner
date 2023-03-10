/** @module Models/User */
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
@Entity()
export class Ingredients extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 100,
		type: "varchar",
	})
	ingName: string;

	@OneToMany((type) => ShoppingList, (sl: ShoppingList) => sl.ing)
	slId: Relation<ShoppingList[]>;

	@OneToMany((type) => RecipeIngredientRel, (rpi: RecipeIngredientRel) => rpi.recipe)
	rpIngRel: Relation<RecipeIngredientRel[]>;
}
