import type { RequestHandler } from "@sveltejs/kit";
import type { user } from "@prisma/client";
import prisma from "$lib/prisma";
import { createJWT } from "$lib/utils/jwt";
import { createCookie } from "$lib/utils/cookies";
import { hashString, newSalt } from "$lib/utils/crypt";

export const post: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const username: string = data.username;
	const password: string = data.password;

	if (await isUsernameTaken(username)) {
		return {
			status: 400,
			body: {
				error: "Username is already taken"
			}
		};
	}

	const passwordSalt = newSalt();
	const passwordHash = hashString(password, passwordSalt);

	// TODO https://blog.logrocket.com/authentication-svelte-using-cookies/
	// TODO https://github.com/mishrasatyam/blog.satyam.life/blob/main/src/routes/blog/svelte-kit-jwt-auth.md
	const user: user = await prisma.user.create({
		data: {
			username: username,
			passwordHash: passwordHash,
			passwordSalt: passwordSalt
		}
	});

	const jwt = createJWT(user.username);

	return {
		status: 201,
		headers: {
			"set-cookie": createCookie({ name: "jwt", value: jwt })
		}
	};
};

async function isUsernameTaken(username: string) {
	const user = await prisma.user.findFirst({ where: { username } });
	return !!user;
}
