/** @module DatabasePlugin */
import "reflect-metadata";
import fp from "fastify-plugin";
import { DataSource, Repository } from "typeorm";
import { User } from "../db/models/user";
import { IPHistory } from "../db/models/ip_history";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { AppDataSource } from "../db/datasources/dev_datasource";
import { MealPlans } from "../db/models/meal_plans";
import { Recipes } from "../db/models/recipes";
import { ShoppingList } from "../db/models/shopping_list";
import { Ingredients } from "../db/models/ingredients";
import { RecipeIngredientRel } from "../db/models/recipe_ingredient_rel";

/** This is AWESOME - we're telling typescript we're adding our own "thing" to base 'app', so we get FULL IDE/TS support */
declare module "fastify" {
	interface FastifyInstance {
		db: DBConfigOpts;
	}

	// interface FastifyRequest {
	// 	myPluginProp: string
	// }
	// interface FastifyReply {
	// 	myPluginProp: number
	// }
}

interface DBConfigOpts {
	user: Repository<User>;
	ip: Repository<IPHistory>;
	mp: Repository<MealPlans>;
	rp: Repository<Recipes>;
	sl: Repository<ShoppingList>;
	ig: Repository<Ingredients>;
	rpIngRel: Repository<RecipeIngredientRel>;
	connection: DataSource;
}

/**
 * Connects and decorates fastify with our Database connection
 * @function
 */
const DbPlugin = fp(
	async (app: FastifyInstance, options: FastifyPluginOptions, done: any) => {
		const dataSourceConnection = AppDataSource;

		await dataSourceConnection.initialize();

		// this object will be accessible from any fastify server instance
		// app.status(200).send()
		// app.db.user
		app.decorate("db", {
			connection: dataSourceConnection,
			user: dataSourceConnection.getRepository(User),
			ip: dataSourceConnection.getRepository(IPHistory),
			mp: dataSourceConnection.getRepository(MealPlans),
			rp: dataSourceConnection.getRepository(Recipes),
			sl: dataSourceConnection.getRepository(ShoppingList),
			ig: dataSourceConnection.getRepository(Ingredients),
			rpIngRel: dataSourceConnection.getRepository(RecipeIngredientRel),
		});

		done();
	},
	{
		name: "database-plugin",
	},
);

export default DbPlugin;
