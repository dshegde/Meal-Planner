// /** @module Routes */
import cors from "cors";
import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from "fastify";
import { User } from "./db/models/user";
import { IPHistory } from "./db/models/ip_history";
import { ILike, LessThan, Not } from "typeorm";
import { Recipes } from "./db/models/recipes";
import { Ingredients } from "./db/models/ingredients";
import { RecipeIngredientRel } from "./db/models/recipe_ingredient_rel";
import { MealPlans } from "./db/models/meal_plans";

/**
 * App plugin where we construct our routes
 * @param {FastifyInstance} app our main Fastify app instance
 */
export async function planner_routes(app: FastifyInstance): Promise<void> {
  // Middleware
  // TODO: Refactor this in favor of fastify-cors
  app.use(cors());

  /*----------------------------------- START of GET ROUTES----------------------------------- */

  //GET all users
  app.get("/users", async (req, reply) => {
    let users = await app.db.user.find();
    reply.send(users);
  });

  //GET user by id
  app.get("/users/:id", async (req: any, reply) => {
    const id = req.params.id;
    let user = await app.db.user.find({
      where: {
        id: id,
      },
    });
    if (user.length == 0) {
      let errMsg = {
        error: `User with id ${req.params.id} not found`,
      };
      reply.status(404).send(errMsg);
    } else {
      reply.send(user);
    }
  });

  //GET all recipe
  app.get("/recipes", async (req, reply) => {
    let recipe = await app.db.rp.find();
    reply.send(recipe);
  });

  //GET all recipe for a particular Cuisine
  //TO might have to change enums for cusineType in recipe to all lowercase. Or else if user enters cajun instead of Cajun, nothing will be returned
  app.get("/recipes/cuisine/:cuisine", async (req: any, reply) => {
    let recipe = await app.db.rp.find({
      where: {
        cuisine: req.params.cuisine,
      },
    });
    if (recipe.length == 0) {
      let errMsg = {
        error: `No recipes found for this cuisine type: ${req.params.cuisine}`,
      };
      reply.status(404).send(errMsg);
    } else {
      reply.send(recipe);
    }
  });

  //GET all recipe for a particular dietType
  app.get("/recipes/dietType/:dietType", async (req: any, reply) => {
    let dietType = await app.db.rp.find({
      where: {
        dietType: req.params.dietType,
      },
    });
    if (dietType.length == 0) {
      let errMsg = {
        error: `No recipes found for this dietType type: ${req.params.dietType}`,
      };
      reply.status(404).send(errMsg);
    } else {
      reply.send(dietType);
    }
  });

  //GET all recipe for a particular dietType and cuisine
  app.get("/recipes/:cuisine/:dietType", async (req: any, reply) => {
    let recipes = await app.db.rp.find({
      where: {
        dietType: req.params.dietType,
        cuisine: req.params.cuisine,
      },
    });
    if (recipes.length == 0) {
      let errMsg = {
        error: `No ${req.params.dietType} and ${req.params.cuisine} recipes found`,
      };
      reply.status(404).send(errMsg);
    } else {
      reply.send(recipes);
    }
  });

  //TODO: check if any needs to be removed
  //GET mealplans for a particular user
  app.get("/mealplan/:userid", async (req: any, reply) => {
    const userid = req.params.userid;
    let mealPlan = await app.db.mp.find({
      relations: {
        recipe: true,
      },
      where: {
        user: {
          id: userid,
        },
      },
    });
    if (mealPlan.length == 0) {
      let errMsg = {
        error: `user with ${userid} does not have any meal plans`,
      };
      reply.status(404).send(errMsg);
    } else {
      reply.send(mealPlan);
    }
  });

  //convert dayOfWeek in the query param to lower case and then get mealplan for a user based on dayOfWeek
  //get mealplan for a user based on dayOfWeek
  app.get("/mealplan/:userid/:dayOfWeek", async (req: any, reply) => {
    const userid = req.params.userid;
    const dayOfWeek = req.params.dayOfWeek;
    let mealPlan = await app.db.mp.find({
      relations: {
        recipe: true,
      },
      where: {
        user: {
          id: userid,
        },
        dayOfWeek: dayOfWeek,
      },
    });
    if (mealPlan.length == 0) {
      let errMsg = {
        error: `user with ${userid} does not have a meal plan for ${dayOfWeek}`,
      };
      reply.status(404).send(errMsg);
    } else {
      reply.send(mealPlan);
    }
  });

  //GET shoppingList for a user
  // need to return ing name too 
  app.get("/shoppingList/:userid", async (req: any, reply) => {
    const userid = req.params.userid;
    let shoppingList = await app.db.sl.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userid,
        },
        check: false,
      },
    });
    if (shoppingList.length == 0) {
      let errMsg = {
        error: `user with ${userid} does not have any shopping lists`,
      };
      reply.status(404).send(errMsg);
    } else {
      reply.send(shoppingList);
    }
  });

  /*----------------------------------- END of GET ROUTES----------------------------------- */

  /*----------------------------------- START of DELETE ROUTES----------------------------------- */
  //DELETE user by id
  app.delete("/users/:id", async (req: any, reply) => {
    const id = req.params.id;
    let user = await app.db.user.findOneByOrFail({
      id: id,
    });
    let res = await user.remove();
    reply.send(user);
  });

  //DELETE mealplans for a particular user 
  app.delete("/mealplan/:userid", async (req: any, reply) => {
    const userid = req.params.userid;
    console.log(userid);
    const query = app.db.mp
      .createQueryBuilder("mp")
      .where("userId = :id", { id: userid })
      .delete()
      .execute();
    const result: any = await query;
    console.log("Res is: ", result);
    reply.send(result);
  });

  //DELETE mealplan for a user based on dayOfWeek -> doesnt work
  app.delete("/mealplan/:userid/:dayOfWeek", async (req: any, reply) => {
    const userid = req.params.userid;
    const dayOfWeek = req.params.dayOfWeek;
    let mealPlan = await app.db.mp.find({
      relations: {
        recipe: true,
      },
      where: {
        user: {
          id: userid,
        },
        dayOfWeek: dayOfWeek,
      },
    });
    if (mealPlan.length == 0) {
      let errMsg = {
        error: `user with ${userid} does not have a meal plan for ${dayOfWeek}`,
      };
      reply.status(404).send(errMsg);
    } else {
      reply.send(mealPlan);
    }
  });

  /*----------------------------------- END of DELETE ROUTES----------------------------------- */

  /*----------------------------------- START of PUT ROUTES----------------------------------- */

  /*----------------------------------- START of PUT ROUTES----------------------------------- */

  /*----------------------------------- START of POST ROUTES----------------------------------- */

  // type OurReplyType =
  //   | {
  //       id?: number;
  //     }
  //   | { name: string }
  //   | { age: number };

  //POST new user
  app.post<{
    Body: {
      name: string;
      email: string;
    };
    Reply:
      | {
          id?: number;
          name?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
          error?: string;
        }
      | string;
  }>("/users", async (req: any, reply) => {
    const { name, email } = req.body;

    if (!name || !email) {
      let errMsg = { error: "Name and email are required" };
      reply.status(400).send(errMsg);
    } else {
      let user = new User();
      user.name = name;
      user.email = email;
      let res = await user.save();
      reply.send(res);
    }
  });

  //POST new recipe and post related relation in ingreiendts recipe relation table
  app.post<{
    Body: {
      recipeName: string;
      dietType: string;
      cuisine: string;
      description: string;
      ingredients: [{ ingName: string }];
    };
    Reply: any;
  }>("/recipe", async (req: any, reply: FastifyReply) => {
    let response = {};
    const { recipeName, dietType, cuisine, description, ingredients } =
      req.body;
    if (!recipeName || !dietType || !cuisine || !description || !ingredients) {
      let errMsg = {
        error:
          "recipeName,description,cuisine,dietType and ingredients are required",
      };
      reply.status(400).send(errMsg);
    } else {
      let recipe = new Recipes();
      recipe.recipeName = recipeName;
      recipe.dietType = dietType;
      recipe.cuisine = cuisine;
      recipe.description = description;
      let res = await recipe.save();
      let mergedObject = {
        ...res,
      };
      for (let i = 0; i < ingredients.length; i++) {
        // let ing = await app.db.ig.findOneByOrFail({
        //   ingName: ingredients[i].ingName,
        // });
        let ing = await app.db.ig.findOne({
          where: {
            ingName: ingredients[i].ingName,
          },
        });
        if (ing) {
          let recipeIngredient = new RecipeIngredientRel();
          recipeIngredient.recipe = recipe;
          recipeIngredient.ingredient = ing;
          let res2 = await recipeIngredient.save();
          mergedObject = {
            ...mergedObject,
            ...res2,
          };
        } else {
          let ingredient = new Ingredients();
          ingredient.ingName = ingredients[i].ingName;
          let res = await ingredient.save();
          let recipeIngredient = new RecipeIngredientRel();
          recipeIngredient.recipe = recipe;
          recipeIngredient.ingredient = ingredient;
          let res2 = await recipeIngredient.save();
          mergedObject = {
            ...mergedObject,
            ...res,
            ...res2,
          };
        }
      }
      reply.send(mergedObject);
    }
  });

  // POST new mealplan for a user
  app.post<{
    Body: {
      userId: number;
      mealType: string;
      dayOfWeek: string;
      recipeId: number;
    };
    Reply: any;
  }>("/mealplan", async (req: any, reply: FastifyReply) => {
    var mealTypeOptions = ["breakfast", "lunch", "dinner", "snack"];
    var dayOfWeekOptions = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const { userId, mealType, dayOfWeek, recipeId } = req.body;
    if (!userId || !mealType || !dayOfWeek || !recipeId) {
      // there has to be a better check to see if mealType and dayOfWeek are valid
      let errMsg = {
        error: "userId,mealType,dayOfWeek and recipeId are required",
      };
      reply.status(400).send(errMsg);
    } else if (
      !mealTypeOptions.includes(mealType) ||
      !dayOfWeekOptions.includes(dayOfWeek)
    ) {
      let errMsg = {
        error: "mealType and dayOfWeek must be valid",
      };
      reply.status(400).send(errMsg);
    } else {
      let mealPlan = new MealPlans();
      let user = await app.db.user.findOne({
        where: {
          id: userId,
        },
      });
      let recipe = await app.db.rp.findOne({
        where: {
          id: recipeId,
        },
      });
      if (!user || !recipe) {
        let errMsg = {
          error: "User or Recipe does not exist",
        };
        reply.status(404).send(errMsg);
      } else {
        let existingMealPlan = await app.db.mp.findOne({
          where: {
            user: {
              id: userId,
            },
            dayOfWeek: dayOfWeek,
            mealType: mealType,
          },
        });

        if (existingMealPlan) {
          let errMsg = {
            error: `there already existing a recipe for ${dayOfWeek} ${mealType} in this users userID:${userId}  meal plan. Please delete the existing meal plan first `,
          };
          reply.status(400).send(errMsg); //is this the right status code?
        } else {
          mealPlan.user = user;
          mealPlan.mealType = mealType;
          mealPlan.dayOfWeek = dayOfWeek;
          mealPlan.recipe = recipe;
          let res = await mealPlan.save();
          reply.send(res);
        }
      }
    }
  });

  /*----------------------------------- END of POST ROUTES----------------------------------- */
}

// 	/**
// 	 * Route replying to /test path for test-testing
// 	 * @name get/test
// 	 * @function
// 	 */
// 	app.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
// 		reply.send("GET Test");
// 	});

// 	/**
// 	 * Route serving login form.
// 	 * @name get/users
// 	 * @function
// 	 */
// 	app.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
// 		// This will return all users along with their associated profiles and ip histories via relations
// 		// https://typeorm.io/find-options
// 		let users = await app.db.user.find({
// 			// This allows you to define which fields appear/do not appear in your result.
// 			select: {
// 				id: true,
// 				name: true,
// 				email: true,
// 				updated_at: true,
// 				created_at: false,
// 			},
// 			// This defines which of our OneToMany/ManyToMany relations we want to return along with each user
// 			relations: {
// 				profiles: true,
// 				ips: {
// 					// We don't need to return user as a part of ip_history because we already know the user
// 					user: false
// 				},
// 			},
// 			where: {
// 				// This will filter our results only to users with an id less than 70.  How cute is this?!?
// 				id: LessThan(70),
// 				profiles: {
// 					// People who name their dog this deserve to be left out, and people naming other species this definitely do
// 					// No offense, people with pets named spot
// 					name: Not(ILike("spot")),
// 				}
// 			}
// 		});
// 		reply.send(users);
// 	});

// 	// CRUD impl for users
// 	// Create new user

// 	// Appease fastify gods
// 	const post_users_opts: RouteShorthandOptions = {
// 		schema: {
// 			body: {
// 				type: 'object',
// 				properties: {
// 					name: {type: 'string'},
// 					email: {type: 'string'}
// 				}
// 			},
// 			response: {
// 				200: {
// 					type: 'object',
// 					properties: {
// 						user: {type: 'object'},
// 						ip_address: {type: 'string'}
// 					}
// 				}
// 			}
// 		}
// 	};

// 	/**
// 	 * Route allowing creation of a new user.
// 	 * @name post/users
// 	 * @function
// 	 * @param {string} name - user's full name
// 	 * @param {string} email - user's email address
// 	 * @returns {IPostUsersResponse} user and IP Address used to create account
// 	 */
// 	app.post<{
// 		Body: IPostUsersBody,
// 		Reply: IPostUsersResponse
// 	}>("/users", post_users_opts, async (req, reply: FastifyReply) => {

// 		const {name, email} = req.body;

// 		const user = new User();
// 		user.name = name;
// 		user.email = email;

// 		const ip = new IPHistory();
// 		ip.ip = req.ip;
// 		ip.user = user;
// 		// transactional, transitively saves user to users table as well IFF both succeed
// 		await ip.save();

// 		//manually JSON stringify due to fastify bug with validation
// 		// https://github.com/fastify/fastify/issues/4017
// 		await reply.send(JSON.stringify({user, ip_address: ip.ip}));
// 	});

// 	// PROFILE Route
// 	/**
// 	 * Route listing all current profiles
// 	 * @name get/profiles
// 	 * @function
// 	 */
// 	app.get("/profiles", async (req, reply) => {
// 		let profiles = await app.db.profile.find();
// 		reply.send(profiles);
// 	});

// 	app.post("/profiles", async (req: any, reply: FastifyReply) => {

// 		const {name} = req.body;

// 		const myUser = await app.db.user.findOneByOrFail({});

// 	  const newProfile = new Profile();
// 	  newProfile.name = name;
// 		newProfile.picture = "ph.jpg";
// 		newProfile.user = myUser;

// 		await newProfile.save();

// 		//manually JSON stringify due to fastify bug with validation
// 		// https://github.com/fastify/fastify/issues/4017
// 		await reply.send(JSON.stringify(newProfile));
// 	});

// 	app.delete("/profiles", async (req: any, reply: FastifyReply) => {

// 		const myProfile = await app.db.profile.findOneByOrFail({});
// 		let res = await myProfile.remove();

// 		//manually JSON stringify due to fastify bug with validation
// 		// https://github.com/fastify/fastify/issues/4017
// 		await reply.send(JSON.stringify(res));
// 	});

// 	app.put("/profiles", async(request, reply) => {
// 		const myProfile = await app.db.profile.findOneByOrFail({});

// 		myProfile.name = "APP.PUT NAME CHANGED";
// 		let res = await myProfile.save();

// 		//manually JSON stringify due to fastify bug with validation
// 		// https://github.com/fastify/fastify/issues/4017
// 		await reply.send(JSON.stringify(res));
// 	});

// }

// // Appease typescript request gods
// interface IPostUsersBody {
// 	name: string,
// 	email: string,
// }

// /**
//  * Response type for post/users
//  */
// export type IPostUsersResponse = {
// 	/**
// 	 * User created by request
// 	 */
// 	user: User,
// 	/**
// 	 * IP Address user used to create account
// 	 */
// 	ip_address: string
// }
