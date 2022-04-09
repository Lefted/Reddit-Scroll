import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
	return {
		status: 301,
		headers: {
			location: "/me"
		}
	}
}
