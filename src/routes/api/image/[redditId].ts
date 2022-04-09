// import type { Link } from "$lib/reddit";
import { extractImage, getLink, type Link } from "$lib/reddit";
import { getAccessToken } from "$utils/authentication";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler<{ redditId: string }> = async ({ params, locals }) => {
	const {username} = locals;
	if (!username) {
		return {
			status: 401,
			body: {
				error: "Unauthorized",
			},
		}
	}

	const accessToken = await getAccessToken();

	if (!accessToken) {
		return {
			status: 500,
			body: {
				error: "Authentication failed"
			}
		};
	}

	const link = await getLink(params.redditId, accessToken);

	if (!link)
		return {
			status: 404,
			body: {
				error: "Link not found"
			}
		};

	const image = extractImage(link as Link);
	if (!image) {
		return {
			status: 404,
			body: {
				error: "Image not found"
			}
		};
	}

	return {
		status: 200,
		body: JSON.stringify(link)
	};
};
