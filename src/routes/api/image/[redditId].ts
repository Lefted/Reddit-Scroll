import { extractImage, getLink } from '$lib/reddit';
import type { Link } from '$lib/reddit';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
	const link = await getLink(params.redditId);

	if (link as Link) {
		const image = extractImage(link as Link);
		return {
			body: image
		}
	} else {
		return {
			status: 400,
			body: link
		};
	}
}
