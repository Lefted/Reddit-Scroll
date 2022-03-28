import { serialize } from "cookie";

export function createCookie({
	name,
	value
}: // origin
{
	name: string;
	value: string;
}) {
	const expires = new Date();
	expires.setHours(expires.getHours() + 1);
	const cookieOptions = { httpOnly: true, path: "/", sameSite: true, expires };
	// cookieOptions.secure = true;
	// cookieOptions.domain = origin;
	const cookie = serialize(name, value, cookieOptions);
	return cookie;
}
