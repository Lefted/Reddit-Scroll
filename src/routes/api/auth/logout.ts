import type { RequestHandler } from "@sveltejs/kit";
import { serialize } from "cookie";

export const get: RequestHandler = async ({ url }) => {
	return {
		status: 302,
		headers: {
			"set-cookie": serialize("jwt", "deleted", {
				expires: new Date(0),
				path: "/",
				domain: url.origin
			}),
			location: "/auth"
		}
	};
};
