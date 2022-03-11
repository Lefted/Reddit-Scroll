import EnvUtil from "$lib/envUtil";
import { getUserAgent } from "$lib/reddit";

const REDDIT_USERNAME: string = EnvUtil.env("REDDIT_USERNAME");
const REDDIT_PASSWORD: string = EnvUtil.env("REDDIT_PASSWORD");
const REDDIT_CLIENT_ID: string = EnvUtil.env("REDDIT_CLIENT_ID");
const REDDIT_SECRET: string = EnvUtil.env("REDDIT_SECRET");

const AUTH_BASE_ENDPOINT = "https://www.reddit.com/api/";
const AUTH_ENDPOINT = `${AUTH_BASE_ENDPOINT}v1/access_token`;

let accessToken: string;

export interface AuthResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
	refresh_token?: string;
}

export async function authenticate(): Promise<string> {
	const res: Response = await fetch(AUTH_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"User-Agent": getUserAgent(),
			Authorization:
				"Basic " + Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_SECRET}`).toString("base64")
		},
		body: `grant_type=password&username=${REDDIT_USERNAME}&password=${REDDIT_PASSWORD}`
	});
	const json: AuthResponse = await res.json();
	return json.access_token;
}

export async function getAccessToken(): Promise<string> {
	return accessToken ?? (accessToken = await authenticate());
}