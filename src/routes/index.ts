import type { link } from "@prisma/client";
import { getLogger } from "$utils/logging";
import prisma from "$lib/prisma";
import { decryptString, isUnlocked } from "$lib/utils/decryption";

const logger = getLogger("routes:index");

export async function get() {
	if (!isUnlocked()) {
		logger.info("database is locked, redirecting to /decrypt");
		return {
			status: 303,
			headers: {
				location: "/login"
			}
		};
	}

	try {
		const linksEncrypted = await prisma.link.findMany();
		const links = await Promise.all(
			linksEncrypted.map(
				async (link) =>
					({
						...link,
						redditId: await decryptString(link.redditId)
					} as link)
			)
		);

		return {
			body: { links }
		};
	} catch (error) {
		logger.error(`Fetching links from the database failed: ${error}`);
		return {
			status: 500,
			body: { error: "Fetching links from the database failed" }
		};
	}
}
