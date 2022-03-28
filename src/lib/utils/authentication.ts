// authentication against reddit api
import { getUserAgent } from "$lib/reddit";
import { getLogger } from "$utils/logging";

const logger = getLogger("authentication");

const REDDIT_USERNAME = import.meta.env.VITE_REDDIT_USERNAME as string;
const REDDIT_PASSWORD = import.meta.env.VITE_REDDIT_PASSWORD as string;
const REDDIT_CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID as string;
const REDDIT_SECRET = import.meta.env.VITE_REDDIT_SECRET as string;

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
	logger.info(`requesting accessToken ${AUTH_ENDPOINT}`);
	const res = await fetch(AUTH_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"User-Agent": getUserAgent(),
			Authorization:
				"Basic " + Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_SECRET}`).toString("base64")
		},
		body: `grant_type=password&username=${REDDIT_USERNAME}&password=${REDDIT_PASSWORD}`
	});

	if (!res.ok) {
		logger.error(`failed to authenticate: ${res.status} ${res.statusText}`);
		return null;
	}

	const json: AuthResponse = await res.json();
	accessToken = json.access_token;
	return accessToken;
}

export async function getAccessToken(): Promise<string> {
	return accessToken ?? (await authenticate());
}
