import type { RequestHandler } from "@sveltejs/kit";
import type { user } from "@prisma/client";
import { getLogger } from "$utils/logging";
import prisma from "$lib/prisma";

const logger = getLogger("routes:signup");

export const post: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const username: string = data.username;
	const password: string = data.password;

	if (await isUsernameTaken(username)) {
		logger.info(`username ${username} is already taken`);
		return {
			status: 400,
			body: {
				error: "Username is already taken"
			}
		};
	}

	const user: user = await prisma.user.create({
		data: {
			username: username,
			password: password
		}
	});
	
	// todo sign jwt and send back
	return {
		status: 201,
		body: {
			jwt: "Not yet implemented"
		}
	};
};

async function isUsernameTaken(username: string) {
	const user = await prisma.user.findFirst({ where: { username } });
	return !!user;
}
