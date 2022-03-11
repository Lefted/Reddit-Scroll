import { PrismaClient } from '@prisma/client';
import decryptString from '$lib/decryption';
const prisma = new PrismaClient();

const keyBuffer = Buffer.from(
	'a57983f19edefb85e0a39e35fcf25af7c28b9d2d8c96dca5b628093d88bb53dd',
	'hex'
);

export async function get() {
	try {
		let posts = await prisma.posts.findMany();
		posts = posts.map(async (post) => ({
			redditId: await decryptString(post.redditId, keyBuffer),
			...post
		}));
		await Promise.all(posts);

		return {
			body: { posts }
		};
	} catch (error) {
		console.error('Unable to query from the database:', error);
		return {
			status: 500,
			body: { error: 'Fetching posts from the database failed' }
		};
	}
}
