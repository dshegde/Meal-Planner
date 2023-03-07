/** @module Seeds/User */
import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";
import { Recipes } from "../models/recipes";
import { faker } from "@faker-js/faker";
import { Ingredients } from "../models/ingredients";

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

    for (let i = 0; i < rp.length; i++) {
      const recipe = [rp[i]];
      for (let j = 0; j < 5; j++) {
        let ing = new Ingredients();
        ing.ingName = faker.lorem.words(3);
        ing.rel = recipe;
        // console.log("ing", ing);
        await ing.save();
      }
    }
  }
}

// generate default instance for convenience
export const IngredientsSeed = new IngredientsSeeder();
