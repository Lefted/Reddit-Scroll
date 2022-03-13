import { extractImage, getLink } from '$lib/reddit';
import { getAccessToken } from '$utils/authentication';
import type { Link } from '$lib/reddit';

export async function get({ params }) {
	const accessToken = await getAccessToken();
	if (!accessToken) {
		return {
			status: 500,
			body: {
				error: 'Authentication failed'
			}
		};
	}

	const link = await getLink(params.redditId, accessToken);

	if (!link) return {
		status: 404,
		body: {
			error: 'Link not found'
		}
	};

	const image = extractImage(link as Link);
	if (!image) {
		return {
			status: 404,
			body: {
				error: 'Image not found'
			}
		};
	}

	return {
		body: image
	}
}
