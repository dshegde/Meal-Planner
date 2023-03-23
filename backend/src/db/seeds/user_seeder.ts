/** @module Seeds/User */
import { User } from "../models/user";
import { Seeder } from "../../lib/seed_manager";
import { FastifyInstance } from "fastify";

/**
 * UserSeeder class - Model class for interacting with "users" table
 */
export class UserSeeder extends Seeder {
  /**
   * Runs the IPHistory table's seed
   * @function
   * @param {FastifyInstance} app
   * @returns {Promise<void>}
   */
  override async run(app: FastifyInstance) {
    app.log.info("Seeding Users...");
    // clear out whatever's already there
    // note we cannot use .clear() because postgres cascade is bugged in Typeorm
    // https://github.com/typeorm/typeorm/issues/1649
    await app.db.user.delete({});
    let userIds = [
      "641800dc739976b7470d8074",
      "641800fa72c885b94f3b3d93",
      "641a4e6f8cca2db234b523f8",
    ];
    let userEmail = ["user1@email.com", "user2@email.com", "user3@email.com"];
    for (let i = 0; i < userIds.length; i++) {
      let user = new User();
      user.id = userIds[i];
      user.name = "user" + i + 1;
      user.email = userEmail[i];
      await user.save();
      app.log.info("Seeded user " + i);
    }
  }
}

// generate default instance for convenience
export const UserSeed = new UserSeeder();
