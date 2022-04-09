// verify jwt token and set user in session
import { getUsername } from "$lib/utils/jwt";
import type { GetSession, Handle } from "@sveltejs/kit";
import { parse } from "cookie";

export const handle: Handle = async ({ event, resolve }) => {
	const { request, locals } = event;
	const cookies = parse(request.headers.get("cookie") || "");

	try {
		locals.username = cookies.jwt && getUsername(cookies.jwt); //this will give decoded value of jwt, eg. : username:xyz
	} catch (err) {
		locals.username = undefined;
	}
	const response = await resolve(event);
	return response;
};

export const getSession: GetSession = ({ locals }) => {
	return {
		username: locals.username
	};
};
