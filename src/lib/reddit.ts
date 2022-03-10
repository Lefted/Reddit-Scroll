// talk to the reddit api
import EnvUtil from "$lib/envUtil";
import { APP_NAME, APP_VERSION, APP_AUTHOR } from "../app-constants";

const REDDIT_USERNAME = EnvUtil.env("REDDIT_USERNAME");
const REDDIT_PASSWORD = EnvUtil.env("REDDIT_PASSWORD");
const REDDIT_CLIENT_ID = EnvUtil.env("REDDIT_CLIENT_ID");
const REDDIT_SECRET = EnvUtil.env("REDDIT_SECRET");

let authentication;

export async function authenticate() {
	try {
		const res = await fetch("https://www.reddit.com/api/v1/access_token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": getUserAgent(),
				Authorization:
					"Basic " + Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_SECRET}`).toString("base64")
			},
			body: `grant_type=password&username=${REDDIT_USERNAME}&password=${REDDIT_PASSWORD}`
		});
		const json = await res.json();
		return [null, json.access_token];
	} catch (err) {
		console.log(err);
		return [err, null];
	}
}

export async function getAccessToken() {
	if (authentication) return authentication;

	const [err, token] = await authenticate();
	if (err) {
		console.log(`Error authenticating: ${err}`);
		return null;
	}

	authentication = token;
	return authentication;
}

export async function getPost(postId) {
	try {
		const res = await fetch(`https://oauth.reddit.com/by_id/${postId}`, {
			headers: {
				Authorization: "bearer " + (await getAccessToken()),
				"User-Agent": getUserAgent()
			}
		});
		if (res.status != 200) return [res.statusText, null];

		return [null, await res.json()];
	} catch (err) {
		console.log(err);
		return [err, null];
	}
}

export async function getImage(postId) {
	const [errors, item] = await getPost(`t3_${postId}`);
	if (errors) return [errors, null];

	try {
		const data = item.data.children[0].data;

		console.log(data);
		// TODO maybe assert on media_embed
		const isValid =
			item.data.children[0].kind == "t3" &&
			data.media_embed &&
			data.thumbnail_width &&
			data.thumbnail_height &&
			// !data.media_only &&
			// data.over_18 &&
			data.url;
		// !data.media &&
		// data.title &&
		// data.is_video == false;

		if (!isValid) return [{ message: "invalid post" }, null];

		const imageData = {
			imgUrl: data.url,
			title: data.title,
			width: data.thumbnail_width,
			height: data.thumbnail_height,
			over_18: data.over_18,
			media_embed: data.media_embed
		};
		return [null, imageData];
	} catch (err) {
		console.log(err);
		return [err, null];
	}
}

function getUserAgent() {
	return `${APP_NAME}/v${APP_VERSION} by ${APP_AUTHOR}`;
}
