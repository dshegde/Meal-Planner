/** @module SeedManager */
import { UserSeed } from "./user_seeder";
import { IPHistorySeed } from "./ip_history_seeder";
import { Seeder } from "../../lib/seed_manager";
// import { AllSeed } from "./seed_all";
import { MealPlansSeed } from "./meal_planner_seeder";
import { RecipeSeed } from "./recipe_seeder";
import { IngredientsSeed } from "./ingredients_seeder";
import { ShoppingListSeed } from "./shoppingList_seeder";

export type SeederOptionsType = {
	seeds: Array<Seeder>;
};

/**
 * Options bag for configuring which seeds to run during `pnpm seed`
 */
const SeederOptions: any = {
	seeds: [UserSeed, IPHistorySeed, RecipeSeed, MealPlansSeed, IngredientsSeed, ShoppingListSeed],
};

export default SeederOptions;
