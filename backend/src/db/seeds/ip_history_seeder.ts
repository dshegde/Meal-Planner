/** @module Seeds/IPHistory */

import { faker } from "@faker-js/faker";
import { Seeder } from "../../lib/seed_manager";
import { IPHistory } from "../models/ip_history";
import { User } from "../models/user";
import { FastifyInstance } from "fastify";

// note here that using faker makes testing a bit...hard
// We can set a particular seed for faker, then use it later in our testing!
faker.seed(100);

/**
 * Seeds the ip_history table
 */
export class IPHistorySeeder extends Seeder {

	/**
   * Runs the IPHistory table's seed
   * @function
   * @param {FastifyInstance} app
   * @returns {Promise<void>}
   */
	override async run(app: FastifyInstance) {
		try {
			app.log.info("Seeding IP Histories...");
			await app.db.ip.delete({});
			const users = await User.find();

			for (const user of users) {
				await this.seedIPHistoryForUser(user, app);
			}
		} catch (error) {
			app.log.error("Error in seeding IP history: ", error);
		}
	}

	private async seedIPHistoryForUser(user: any, app: FastifyInstance) {
		await this.createAndSaveIPHistory(user);
		await this.createAndSaveIPHistory(user);

		app.log.info("Finished seeding IP history pair for user: " + user.id);
	}

	private async createAndSaveIPHistory(user: any) {
		let ipHistory = new IPHistory();
		ipHistory.user = user;
		ipHistory.ip = faker.internet.ip();
		await ipHistory.save();
	}
}

export const IPHistorySeed = new IPHistorySeeder();
