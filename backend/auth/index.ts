import fastify, { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import Jwt, { VerifyPayloadType } from "@fastify/jwt";
import fp from "fastify-plugin";
import dotenv from "dotenv";
import { env } from "process";

dotenv.config();

const server = require("fastify")();

server.register(require("fastify-auth0-verify"), {
	domain: env.VITE_AUTH0_DOMAIN,
	audience: env.VITE_AUTH0_AUDIENCE,
});

server.register(function (instance, _options, done) {
	instance.get("/verify", {
		handler: function (request, reply) {
			reply.send(request.user);
		},
		preValidation: instance.authenticate,
	});

	done();
});

// fastify.addHook("onRequest", async (request, reply) => {
// 	try {
// 		await request.jwtVerify();
// 	} catch (err) {
// 		reply.send(err);
// 	}
// });

server.listen(env.VITE_PORT, (err) => {
	if (err) {
		console.log("error", err);
	}
});

