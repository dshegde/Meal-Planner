/** @module Seeds/User */
import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";
import { Recipes } from "../models/recipes";
import { faker } from "@faker-js/faker";
import { Ingredients } from "../models/ingredients";
import { User } from "../models/user";
import { MealPlans } from "../models/meal_plans";
import { ShoppingList } from "../models/shopping_list";
import { table } from "console";

export class ShoppingListSeeder extends Seeder {
	/**
	 * Runs the IPHistory table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	//user -> MealPlan -> recipe - > ingredients-> shoppingList
	override async run(app: FastifyInstance) {
		app.log.info("Seeding ingredients...");
		// clear out whatever's already there
		await app.db.sl.delete({});
		const user = await User.find();
		const mp = await MealPlans.find();
		const rp = await Recipes.find();
		const ig = await Ingredients.find();

		for (let i = 0; i < user.length; i++) {
			// let sl = new ShoppingList();
			// sl.user = user[i];
			let mealPlan = await app.db.mp.find({
				relations: {
					recipe: true,
				},
				where: {
					user: {
						id: user[i].id,
					},
				},
			});

			for (let j = 0; j < mealPlan.length; j++) {
				let recipe = await app.db.rpIngRel.find({
					relations: {
						ingredient: true,
					},
					where: {
						recipe: {
							id: mealPlan[j].recipe.id,
						},
					},
				});

				for (let k = 0; k < recipe.length; k++) {
					let sl = new ShoppingList();
					sl.user = user[i];
					sl.ing = recipe[k].ingredient;
					await sl.save();
				}
			}
		}
	}
}

// generate default instance for convenience
export const ShoppingListSeed = new ShoppingListSeeder();
