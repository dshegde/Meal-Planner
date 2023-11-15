/** @module Seeds/User */
import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";
import { Recipes } from "../models/recipes";
import { faker } from "@faker-js/faker";
import { Ingredients } from "../models/ingredients";
import { RecipeIngredientRel } from "../models/recipe_ingredient_rel";

export class IngredientsSeeder extends Seeder {
	/**
	 * Runs the IPHistory table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */

	override async run(app: FastifyInstance) {
		try {
			app.log.info("Seeding ingredients...");
			await app.db.ig.delete({});
			const recipes = await Recipes.find();

			// seeding both ingredients table as well as the many-to-many relation table
			for (const recipe of recipes) {
				await this.seedIngredientsForRecipe(recipe);
			}
		} catch (error) {
			app.log.error("Error in seeding ingredients: ", error);
		}
	}

	private async seedIngredientsForRecipe(recipe: any) {
		const INGREDIENTS_PER_RECIPE = 5;
		for (let i = 0; i < INGREDIENTS_PER_RECIPE; i++) {
			let rel = new RecipeIngredientRel();
			let ing = new Ingredients();
			ing.ingName = faker.lorem.words(3);
			rel.recipe = recipe;
			rel.ingredient = ing;
			await ing.save();
			await rel.save();
		}
	}
}

// generate default instance for convenience
export const IngredientsSeed = new IngredientsSeeder();
