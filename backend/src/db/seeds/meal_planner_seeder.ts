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

enum DayOfWeek {
	monday,
	tuesday,
	wednesday,
	thursday,
	friday,
	saturday,
	sunday,
}

enum MealType {
	breakfast,
	lunch,
	dinner,
}

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

		try {
			app.log.info("Seeding MealPlan...");
			await app.db.mp.delete({});
			const users = await User.find();

			for (let user of users) {
				await this.seedMealPlanForUser(user);
			}
			app.log.info("Finished seeding MealPlan");
		} catch (error) {
			app.log.error("Error in seeding MealPlan: ", error);
		}
	}

	private async seedMealPlanForUser(user: any) {
		const dayNames = Object.values(DayOfWeek).filter(value => isNaN(Number(value)));
		for (let dayOfWeek of dayNames) {

			const mealTypes = Object.values(MealType).filter(value => isNaN(Number(value)));
			for (let mealType of mealTypes) {

				const mealplan = new MealPlans();
				mealplan.user = user;
				mealplan.dayOfWeek = dayOfWeek as string;
				const recipe = await Recipes.find();
				if (recipe.length > 0) {
					mealplan.recipe = recipe[GenerateRandomNumber(recipe.length - 1)];
				} else {
					console.error('No recipes found');
					continue;
				}
				mealplan.mealType = mealType as string;
				await mealplan.save();
			}
		}
	}
}
export const MealPlansSeed = new MealPlansSeeder();
