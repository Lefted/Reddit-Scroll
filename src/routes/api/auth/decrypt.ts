export {};
// import type { RequestEvent } from "@sveltejs/kit/types/internal";
// import type { CipherKey } from "crypto";
// import { decryptString, saveKey } from "$utils/decryption";
// import { createJWT } from "$utils/jwt";
// import { getLogger } from "$utils/logging";
// import { createCookie } from "$utils/cookies";
// import prisma from "$lib/prisma";
// import type { user } from "@prisma/client";

// const logger = getLogger("routes:decrypt");

// /** @type {import('@sveltejs/kit').RequestHandler} */
// export async function post({ request }: RequestEvent) {
// 	const data = await request.json();
// 	const key = data.key;

// 	if (!key) {
// 		logger.info("key is missing");
// 		return {
// 			status: 400,
// 			body: {
// 				error: "Missing key"
// 			}
// 		};
// 	}

// 	const keyCipher: CipherKey = Buffer.from(key, "hex");

// 	if (!(await isKeyValid(keyCipher))) {
// 		logger.info(`invalid key: ${key}`);
// 		return {
// 			status: 400,
// 			body: {
// 				error: "Invalid key"
// 			}
// 		};
// 	}

// 	const username = "soon tm";
// 	const jwt = createJWT({id: 0, username: username} as user);
// 	const cookie = createCookie({ name: "jwt", value: jwt });

// 	// TODO dont save server-wide
// 	saveKey(keyCipher);

// 	// redirect to main page
// 	logger.info("key accepted, redirecting to /");
// 	return {
// 		status: 200,
// 		body: {
// 			message: "Key accepted",
// 			"set-cookie": cookie
// 		}
// 	};
// }

// async function isKeyValid(key: CipherKey) {
// 	try {
// 		const testEntry = await prisma.link.findFirst();
// 		await decryptString(testEntry.redditId, key);
// 		return true;
// 	} catch (error) {
// 		return false;
// 	}
// }
