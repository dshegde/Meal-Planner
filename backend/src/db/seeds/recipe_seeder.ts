/** @module Seeds/User */
import { User } from "../models/user";
import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";
import { Recipes } from "../models/recipes";
import { faker } from "@faker-js/faker";
import { GenerateRandomNumber } from "../../lib/helpers";

export class RecipeSeeder extends Seeder {
  /**
   * Runs the IPHistory table's seed
   * @function
   * @param {FastifyInstance} app
   * @returns {Promise<void>}
   */

  override async run(app: FastifyInstance) {
    enum DietType {
      vegan = 1,
      vegetarian = 2,
      pescatarian = 3,
      NonVegetarian = 4,
    }
    enum CuisineType {
      American = 1,
      Asian = 2,
      British = 3,
      Cajun = 4,
    }
    app.log.info("Seeding recipe...");
    // clear out whatever's already there
    await app.db.rp.delete({});
    
    const users = await User.find();
    for (let i = 0; i < users.length; i++) {
      let rp = new Recipes();
      rp.recipeName = faker.lorem.words(3);
      rp.dietType = DietType[GenerateRandomNumber(4)];
      rp.cuisine = CuisineType[GenerateRandomNumber(4)];
      rp.description = faker.lorem.words(10);
      await rp.save();
    }
  }
}

// generate default instance for convenience
export const RecipeSeed = new RecipeSeeder();
