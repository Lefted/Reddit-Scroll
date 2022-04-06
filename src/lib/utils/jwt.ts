// create and verify JWTs
import type { user } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";

const JWT_KEY = import.meta.env.VITE_JWT_KEY as string;

export function createJWT({ id, username }: user) {
	return sign({ id: id, username: username }, JWT_KEY);
}

export function getUser(jwt: string): { id: string; username: string } {
	return verify(jwt, JWT_KEY) as { id: string; username: string };
}
