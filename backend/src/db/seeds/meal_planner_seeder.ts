/** @module Seeds/MealPlans */

import { faker } from "@faker-js/faker";
import { Seeder } from "../../lib/seed_manager";
import { MealPlans } from "../models/meal_plans";
import { User } from "../models/user";
import { FastifyInstance } from "fastify";
import { Recipes } from "../models/recipes";
import { GenerateRandomNumber } from "../../lib/helpers";

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
		enum MealType {
			breakfast = 1,
			lunch = 2,
			dinner = 3,
		}
		enum DayOfWeek {
			monday = 1,
			tuesday = 2,
			wednesday = 3,
			thursday = 4,
			friday = 5,
			saturday = 6,
			sunday = 7,
		}
		app.log.info("Seeding MealPlan...");
		// Remove everything in there currently
		await app.db.mp.delete({});
		// get our users
		const users = await User.find();
		// get our recipes
		// const rp = await Recipes.find();

		for (let i = 0; i < users.length; i++) {
			let mealID = i;
			let dayOfWeek = DayOfWeek[GenerateRandomNumber(7)];
			let user = users[i];
			// let recipe = rp[i];
			for (let j = 0; j < 3; j++) {
				let mealplan = new MealPlans();
				mealplan.user = user;
				mealplan.dayOfWeek = dayOfWeek;
				mealplan.mealId = mealID;
				let recipe = await Recipes.find();
				mealplan.recipe = recipe[GenerateRandomNumber(recipe.length - 1)];
				switch (j) {
					case 0:
						mealplan.mealType = "breakfast";
						break;
					case 1:
						mealplan.mealType = "lunch";
						break;
					case 2:
						mealplan.mealType = "dinner";
						break;
					default:
						mealplan.mealType = "breakfast";
						break;
				}

				try {
					await mealplan.save();
				} catch (err) {
					console.log("err", err);
				}
			}

			app.log.info("Finished seeding MealPlans!");
		}
	}
}
export const MealPlansSeed = new MealPlansSeeder();
