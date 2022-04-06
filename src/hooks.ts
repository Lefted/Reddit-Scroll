// verify jwt token and set user in session
import type { GetSession, Handle } from "@sveltejs/kit";
import { getUser } from "$lib/utils/jwt";
import { parse } from "cookie";

export const handle: Handle = async ({ event, resolve }) => {
	const { request, locals } = event;
	const cookies = parse(request.headers.get("cookie") || "");

	try {
		locals.user = cookies.jwt && getUser(cookies.jwt); //this will give decoded value of jwt eg : {username:xyz}
	} catch (err) {
		locals.user = undefined;
	}
	const response = await resolve(event);
	return response;
};

export const getSession: GetSession = ({ locals }) => {
	return {
		user: locals.user && {
			...locals.user
		}
	};
};
