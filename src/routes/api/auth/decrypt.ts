import type { RequestEvent } from "@sveltejs/kit/types/internal";
import type { CipherKey } from "crypto";
import { decryptString } from "$lib/utils/decryption";
import { saveKey } from "$utils/decryption";
import { getLogger } from "$lib/utils/logging";
import prisma from "$lib/prisma";

const logger = getLogger("routes:decrypt");

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }: RequestEvent) {
	const data = await request.json();
	const key = data.key;

	if (!key) {
		logger.info("key is missing");
		return {
			status: 400,
			body: {
				error: "Missing key"
			}
		};
	}

	const keyCipher: CipherKey = Buffer.from(key, "hex");

	if (!(await isKeyValid(keyCipher))) {
		logger.info(`invalid key: ${key}`);
		return {
			status: 400,
			body: {
				error: "Invalid key"
			}
		};
	}

	saveKey(keyCipher);

	// redirect to main page
	logger.info("key accepted, redirecting to /");
	return {
		status: 200,
		body: {
			message: "Key accepted"
		}
	};
}

async function isKeyValid(key: CipherKey) {
	try {
		const testEntry = await prisma.link.findFirst();
		await decryptString(testEntry.redditId, key);
		return true;
	} catch (error) {
		return false;
	}
}
