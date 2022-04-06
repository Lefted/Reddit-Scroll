// create and verify JWTs
import { sign, verify } from "jsonwebtoken";

const JWT_KEY = import.meta.env.VITE_JWT_KEY as string;

export function createJWT(username: string) {
	return sign({ username: username }, JWT_KEY);
}

export function getUsername(jwt: string) {
	return (verify(jwt, JWT_KEY) as { username: string }).username;
}
