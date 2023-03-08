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
		app.log.info("Seeding ingredients...");
		// clear out whatever's already there
		await app.db.ig.delete({});
		const rp = await Recipes.find();

		// seeding both ingredients table as well as the many-to-many relation table
		for (let i = 0; i < rp.length; i++) {
			const recipe = [rp[i]];
			for (let j = 0; j < 5; j++) {
				let rel = new RecipeIngredientRel();
				let ing = new Ingredients();
				ing.ingName = faker.lorem.words(3);
				rel.recipe = recipe[0];
				rel.ingredient = ing;
				await ing.save();
				await rel.save();
			}
		}
	}
}

// generate default instance for convenience
export const IngredientsSeed = new IngredientsSeeder();
