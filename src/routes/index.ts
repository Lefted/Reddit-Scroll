import { getLogger } from '$utils/logging';
import prisma from "$lib/prisma"
import decryptString, { isUnlocked } from '$lib/utils/decryption';
import type { CipherKey } from 'crypto';
import type { link } from '@prisma/client';

const logger = getLogger('routes:index');

const keyBuffer: CipherKey = Buffer.from(
	'e9b11f972afe0fd6129d09d087552564b259b8f42ccb45808e016dd9ccd3d999',
	'hex'
);

export async function get() {
	if (!isUnlocked()) {
		logger.info("database is locked, redirecting to /decrypt");
		return {
			status: 303,
			headers: {
				location: '/decrypt'
			}
		}
	}

	try {
		const linksEncrypted = await prisma.link.findMany();
		const links = linksEncrypted.map(async (link) => ({
			redditId: await decryptString(link.redditId, keyBuffer),
			...link
		} as link));
		await Promise.all(links);

		return {
			body: { links }
		};
	} catch (error) {
		logger.error(`Fetching links from the database failed: ${error}`);
		return {
			status: 500,
			body: { error: 'Fetching links from the database failed' }
		};
	}
}
