/** @module Models/User */
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn, ManyToOne } from "typeorm";
import { Ingredients } from "./ingredients";
import { MealPlans } from "./meal_plans";

import { User } from "./user";

/**
 *  Class representing user table
 */
@Entity()
export class ShoppingList extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: false })
	check: boolean;

	@ManyToOne((type) => User, (user: User) => user.slIds, {
		//adding an IPHistory will also add associated User if it is new, somewhat useless in this example
		cascade: true,
		// if we delete a User, also delete their IP History
		onDelete: "CASCADE",
	})
	user: Relation<User>;

	@ManyToOne((type) => Ingredients, (ing: Ingredients) => ing.slId, {
		//adding an IPHistory will also add associated User if it is new, somewhat useless in this example
		cascade: true,
		// if we delete a User, also delete their IP History
		onDelete: "CASCADE",
	})
	ing: Relation<Ingredients>;
}
