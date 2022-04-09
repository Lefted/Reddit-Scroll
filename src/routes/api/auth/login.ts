import type { RequestHandler } from "@sveltejs/kit";
import type { user } from "@prisma/client";
import { createJWT } from "$lib/utils/jwt";
import { createCookie } from "$lib/utils/cookies";
import prisma from "$lib/prisma";
import { checkInputWithHash } from "$lib/utils/crypt";

export const post: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const username: string = data.username;
	const password: string = data.password;

	const user: user = await prisma.user.findFirst({ where: { username } });
	if (!user) {
		return {
			status: 400,
			body: {
				error: "Username does not exist"
			}
		};
	}

	if (!checkInputWithHash(password, user.passwordHash, user.passwordSalt)) {
		return {
			status: 400,
			body: {
				error: "Password is incorrect"
			}
		};
	}

	const jwt = createJWT(user.username);

	return {
		status: 201,
		headers: {
			"set-cookie": createCookie({ name: "jwt", value: jwt })
		}
	};
};
