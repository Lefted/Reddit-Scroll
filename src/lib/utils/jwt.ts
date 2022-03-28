// create and verify JWTs
import EnvUtil from "$utils/environment";
import { sign, verify } from "jsonwebtoken";

const JWT_KEY = EnvUtil.env("JWT_KEY");

export function createJWT(username: string) {
	return sign({ username: username }, JWT_KEY);
}

export function getUsername(jwt: string) {
	return verify(jwt, JWT_KEY);
}

export function isValidJWT(jwt: string) {
	try {
		getUsername(jwt);
		return true;
	} catch {
		return false;
	}
}