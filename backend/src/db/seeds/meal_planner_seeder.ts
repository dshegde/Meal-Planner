/** @module Seeds/MealPlans */

import { faker } from "@faker-js/faker";
import { Seeder } from "../../lib/seed_manager";
import { MealPlans } from "../models/meal_plans";
import { User } from "../models/user";
import { FastifyInstance } from "fastify";

// note here that using faker makes testing a bit...hard
// We can set a particular seed for faker, then use it later in our testing!
faker.seed(100);

/**
 * Seeds the ip_history table
 */
export class MealPlansSeeder extends Seeder {
  /**
   * Runs the MealPlans table's seed
   * @function
   * @param {FastifyInstance} app
   * @returns {Promise<void>}
   */
  override async run(app: FastifyInstance) {
    app.log.info("Seeding IP Histories...");
    // Remove everything in there currently
    await app.db.mp.delete({});
    // get our users and make each a few IPs
    const users = await User.find();

    let mp = new MealPlans();
    mp.user = users[0];
    mp.mealId = 1;
    mp.mealType = "breakfast";
    mp.recipeId = 1;
    mp.dayOfWeek = "monday";
    await mp.save();

    let mp1 = new MealPlans();
    mp1.user = users[0];
    mp1.mealId = 1;
    mp1.mealType = "lunch";
    mp1.recipeId = 2;
    mp1.dayOfWeek = "monday";
    await mp1.save();

    let mp2 = new MealPlans();
    mp2.user = users[0];
    mp2.mealId = 1;
    mp2.mealType = "dinner";
    mp2.recipeId = 3;
    mp2.dayOfWeek = "monday";
    await mp2.save();

    app.log.info("Finished seeding 3 hard coded meal plans for a random user");
  }
}

export const MealPlansSeed = new MealPlansSeeder();
