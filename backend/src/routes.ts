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
import { ShoppingList } from "./db/models/shopping_list";

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
  // need to return ing name too - done
  app.get("/shoppingList/:userid", async (req: any, reply) => {
    const userid = req.params.userid;
    let shoppingList = await app.db.sl.find({
      relations: {
        user: true,
        ing: true,
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

  //DELETE all mealplans for a particular user
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

  //DELETE a mealplans for a particular user based on dayOfWeek and mealType
  app.delete(
    "/mealplan/:userid/:dayOfWeek/:mealType",
    async (req: any, reply) => {
      const { userid, dayOfWeek, mealType } = req.params;
      const query = app.db.mp
        .createQueryBuilder("mp")
        .where("userId = :id", { id: userid })
        .andWhere("dayOfWeek = :dayOfWeek", { dayOfWeek: dayOfWeek })
        .andWhere("mealType = :mealType", { mealType: mealType })
        .delete()
        .execute();
      const result: any = await query;
      console.log("Res is: ", result);
      reply.send(result);
    }
  );

  //DELETE mealplan for a user based on dayOfWeek
  app.delete("/mealplan/:userid/:dayOfWeek", async (req: any, reply) => {
    const { userid, dayOfWeek } = req.params;
    const query = app.db.mp
      .createQueryBuilder("mp")
      .where("userId = :id", { id: userid })
      .andWhere("dayOfWeek = :dayOfWeek", { dayOfWeek: dayOfWeek })
      .delete()
      .execute();
    const result: any = await query;
    console.log("Res is: ", result);
    reply.send(result);
  });

  /*----------------------------------- END of DELETE ROUTES----------------------------------- */

  /*----------------------------------- START of PUT ROUTES----------------------------------- */
  //PUT ingredient's checked status to true for a users shopping list
  app.put<{
    Body: {
      userId: number;
      ingredientId: number;
    };
    Reply: any;
  }>("/shoppinglist", async (req: any, reply: FastifyReply) => {
    const { userId, ingredientId } = req.body;
    if (!userId || !ingredientId) {
      let errMsg = {
        error: "userId and ingredientId are required",
      };
      reply.status(400).send(errMsg);
    } else {
      let user = await app.db.user.findOne({
        where: {
          id: userId,
        },
      });
      let ingredient = await app.db.ig.findOne({
        where: {
          id: ingredientId,
        },
      });
      if (!user || !ingredient) {
        let errMsg = {
          error: "User or Ingredient does not exist",
        };
        reply.status(404).send(errMsg);
      } else {
        let ShopListItem = await app.db.sl.findOne({
          where: {
            check: false,
            user: {
              id: userId,
            },
            ing: {
              id: ingredientId,
            },
          },
        });
        if (!ShopListItem) {
          let errMsg = {
            error: `User doesnt have this ingredient in their shopping list`,
          };
          reply.status(404).send(errMsg);
        } else {
          ShopListItem.check = true;
          let res = await ShopListItem.save();
          reply.send(res);
        }
      }
    }
  });
  // PUT exisitng mealplan for a user to update the recipe
  app.put<{
    Body: {
      userId: number;
      mealType: string;
      dayOfWeek: string;
      recipeId: number;
    };
    Reply: any;
  }>("/mealplan", async (req: any, reply: FastifyReply) => {
    let mealTypeOptions = ["breakfast", "lunch", "dinner", "snack"];
    let dayOfWeekOptions = [
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
        error: "userId, mealType, dayOfWeek and recipeId are required",
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
          existingMealPlan.recipe = recipe;
          let res = await existingMealPlan.save();
          reply.send(res);
        } else {
          let errMsg = {
            error: `there doesnt exist a recipe for ${dayOfWeek} ${mealType} in this users userID:${userId}  meal plan. Please add this meal plan first `,
          };
          reply.status(400).send(errMsg);

          let ings = await app.db.rpIngRel.find({
            relations: {
              ingredient: true,
            },
            where: {
              recipe: {
                id: recipeId,
              },
            },
          });

          let mealPlan = new MealPlans();
          mealPlan.user = user;
          mealPlan.mealType = mealType;
          mealPlan.dayOfWeek = dayOfWeek;
          mealPlan.recipe = recipe;
          let res = await mealPlan.save();
          for (let i = 0; i < ings.length; i++) {
            let shoppingList = new ShoppingList();
            shoppingList.user = user;
            shoppingList.ing = ings[i].ingredient;
            let res = await shoppingList.save();
            console.log(res);
          }

          reply.send(res);
        }
      }
    }
  });

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
          id?: string;
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
        error: "userId, mealType, dayOfWeek and recipeId are required",
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
          let ings = await app.db.rpIngRel.find({
            relations: {
              ingredient: true,
            },
            where: {
              recipe: {
                id: recipeId,
              },
            },
          });
          // console.log(ings);

          let mealPlan = new MealPlans();
          mealPlan.user = user;
          mealPlan.mealType = mealType;
          mealPlan.dayOfWeek = dayOfWeek;
          mealPlan.recipe = recipe;
          let res = await mealPlan.save();
          for (let i = 0; i < ings.length; i++) {
            let shoppingList = new ShoppingList();
            shoppingList.user = user;
            shoppingList.ing = ings[i].ingredient;
            let res = await shoppingList.save();
            console.log(res);
          }

          reply.send(res);
        }
      }
    }
  });

  //POST ingredient to a users shopping list
  app.post<{
    Body: {
      userId: number;
      ingredientId: number;
    };
    Reply: any;
  }>("/shoppinglist", async (req: any, reply: FastifyReply) => {
    const { userId, ingredientId } = req.body;
    if (!userId || !ingredientId) {
      let errMsg = {
        error: "userId and ingredientId are required",
      };
      reply.status(400).send(errMsg);
    } else {
      let user = await app.db.user.findOne({
        where: {
          id: userId,
        },
      });
      console.log("This is the user" + user);
      let ingredient = await app.db.ig.findOne({
        where: {
          id: ingredientId,
        },
      });
      if (!user || !ingredient) {
        let errMsg = {
          error: "User or Ingredient does not exist",
        };
        reply.status(404).send(errMsg);
      } else {
        let ShopListItem = await app.db.sl.find({
          where: {
            check: false,
            user: {
              id: userId,
            },
            ing: {
              id: ingredientId,
            },
          },
        });
        if (ShopListItem !== null && ShopListItem.length > 0) {
          let errMsg = {
            error: `User already has this ingredient in their shopping list`,
          };
          reply.status(400).send(errMsg);
        } else {
          let shoppingList = new ShoppingList();
          shoppingList.user = user;
          shoppingList.ing = ingredient;
          //not setting checked cause it is false by default
          let res = await shoppingList.save();
          reply.send(res);
        }
      }
    }
  });

  /*----------------------------------- END of POST ROUTES----------------------------------- */
}
