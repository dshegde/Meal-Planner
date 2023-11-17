/** @module Seeds/User */
import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";
import { User } from "../models/user";
import { ShoppingList } from "../models/shopping_list";

export class ShoppingListSeeder extends Seeder {
	/**
	 * Runs the IPHistory table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding ingredients...");
		await app.db.sl.delete({});
		const users = await User.find();

		for (const user of users) {
			const mealPlans = await this.findMealPlans(user.id, app);

			for (const mealPlan of mealPlans) {
				const recipeIngredients = await this.findIngredients(mealPlan.recipe.id, app);

				for (const recipe of recipeIngredients) {
					const sl = new ShoppingList();
					sl.user = user;
					sl.ing = recipe.ingredient;
					await sl.save();
				}
			}
		}
		app.log.info("Finished seeding ingredients");
	}

	async findMealPlans(userId: any, app: FastifyInstance) {
		return app.db.mp.find({
			relations: {
				recipe: true,
			},
			where: {
				user: {
					id: userId,
				},
			},
		});
	}

	async findIngredients(recipeId: any, app: FastifyInstance) {
		return app.db.rpIngRel.find({
			relations: {
				ingredient: true,
			},
			where: {
				recipe: {
					id: recipeId,
				},
			},
		});
	}
}

export const ShoppingListSeed = new ShoppingListSeeder();
