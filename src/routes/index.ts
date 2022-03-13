import { PrismaClient } from '@prisma/client';
import { getLogger } from '$utils/logging';
import decryptString from '$lib/utils/decryption';
import type { CipherKey } from 'crypto';
import type { post } from '@prisma/client';

const logger = getLogger('routes:index');
const prisma = new PrismaClient();

const keyBuffer: CipherKey = Buffer.from(
	'a57983f19edefb85e0a39e35fcf25af7c28b9d2d8c96dca5b628093d88bb53dd',
	'hex'
);

export async function get() {
	try {
		const postsEncrypted = await prisma.post.findMany();
		const posts = postsEncrypted.map(async (post) => ({
			redditId: await decryptString(post.redditId, keyBuffer),
			...post
		} as post));
		await Promise.all(posts);

		return {
			body: { posts }
		};
	} catch (error) {
		logger.error(`Fetching posts from the database failed: ${error}`);
		return {
			status: 500,
			body: { error: 'Fetching posts from the database failed' }
		};
	}
}
