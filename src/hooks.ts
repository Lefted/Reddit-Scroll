import type { GetSession } from "@sveltejs/kit";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import EnvUtil from "$utils/environment";

const JWT_KEY = EnvUtil.env("JWT_KEY");

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const { request, locals } = event;
	const cookies = parse(request.headers.get("cookie") || "");
	//verify your jwt here, pass data to session object using locals
	try {
		locals.user = cookies.jwt && verify(cookies.jwt, JWT_KEY); //this will give decoded value of jwt eg : {username:xyz}
	} catch (err) {
		locals.user = undefined;
	}
	const response = await resolve(event);
	return response;
}

export const getSession: GetSession = ({ locals }) => {
	return {
		user: locals.user
	};
};
