// talk to the reddit api
import { APP_NAME, APP_VERSION, APP_AUTHOR } from "../app-constants";
import { getAccessToken } from "$utils/authentication";

export interface Link {
	kind?: string;
	data?: LinkData;
}

export interface LinkData {
	after?: null;
	dist?: number;
	modhash?: null;
	geo_filter?: string;
	children?: Child[];
	before?: null;
}

export interface Child {
	kind?: "t1" | "t2" | "t3" | "t4" | "t5";
	data?: ChildData;
}

export interface ChildData {
	approved_at_utc?: null;
	subreddit?: string;
	selftext?: string;
	author_fullname?: string;
	saved?: boolean;
	mod_reason_title?: null;
	gilded?: number;
	clicked?: boolean;
	title?: string;
	link_flair_richtext?: any[];
	subreddit_name_prefixed?: string;
	hidden?: boolean;
	pwls?: number;
	link_flair_css_class?: null;
	downs?: number;
	thumbnail_height?: number;
	top_awarded_type?: null;
	hide_score?: boolean;
	name?: string;
	quarantine?: boolean;
	link_flair_text_color?: string;
	upvote_ratio?: number;
	author_flair_background_color?: string;
	subreddit_type?: string;
	ups?: number;
	total_awards_received?: number;
	media_embed?: any;
	thumbnail_width?: number;
	author_flair_template_id?: null;
	is_original_content?: boolean;
	user_reports?: any[];
	secure_media?: null;
	is_reddit_media_domain?: boolean;
	is_meta?: boolean;
	category?: null;
	secure_media_embed?: any;
	link_flair_text?: null;
	can_mod_post?: boolean;
	score?: number;
	approved_by?: null;
	is_created_from_ads_ui?: boolean;
	author_premium?: boolean;
	thumbnail?: string;
	edited?: boolean;
	author_flair_css_class?: string;
	author_flair_richtext?: AuthorFlairRichtext[];
	gildings?: any;
	content_categories?: null;
	is_self?: boolean;
	mod_note?: null;
	created?: number;
	link_flair_type?: string;
	wls?: number;
	removed_by_category?: null;
	banned_by?: null;
	author_flair_type?: string;
	domain?: string;
	allow_live_comments?: boolean;
	selftext_html?: null;
	likes?: null;
	suggested_sort?: string;
	banned_at_utc?: null;
	url_overridden_by_dest?: string;
	view_count?: null;
	archived?: boolean;
	no_follow?: boolean;
	is_crosspostable?: boolean;
	pinned?: boolean;
	over_18?: boolean;
	all_awardings?: any[];
	awarders?: any[];
	media_only?: boolean;
	can_gild?: boolean;
	spoiler?: boolean;
	locked?: boolean;
	author_flair_text?: string;
	treatment_tags?: any[];
	visited?: boolean;
	removed_by?: null;
	num_reports?: null;
	distinguished?: null;
	subreddit_id?: string;
	author_is_blocked?: boolean;
	mod_reason_by?: null;
	removal_reason?: null;
	link_flair_background_color?: string;
	id?: string;
	is_robot_indexable?: boolean;
	report_reasons?: null;
	author?: string;
	discussion_type?: null;
	num_comments?: number;
	send_replies?: boolean;
	whitelist_status?: string;
	contest_mode?: boolean;
	mod_reports?: any[];
	author_patreon_flair?: boolean;
	author_flair_text_color?: string;
	permalink?: string;
	parent_whitelist_status?: string;
	stickied?: boolean;
	url?: string;
	subreddit_subscribers?: number;
	created_utc?: number;
	num_crossposts?: number;
	media?: null;
	is_video?: boolean;
}

export interface AuthorFlairRichtext {
	e?: string;
	t?: string;
}

export async function getLink(linkId): Promise<string | Link> {
	const res = await fetch(`https://oauth.reddit.com/by_id/${linkId}`, {
		headers: {
			Authorization: "bearer " + (await getAccessToken()),
			"User-Agent": getUserAgent()
		}
	});

	if (!res.ok) return res.statusText;
	return await res.json() as Link;
}

export interface Image {
	title: string;
	url: string;
	thumbnail_width: number;
	thumbnail_height: number;
}

export function extractImage(link: Link): (Image | null) {
	if (link.data?.children[0]?.kind == "t3" &&
		link.data?.children[0]?.data?.url && //
		link.data?.children[0]?.data?.title && //
		link.data?.children[0]?.data?.thumbnail_width && //
		link.data?.children[0]?.data?.thumbnail_height
	) {
		return {
			title: link.data?.children[0]?.data?.title,
			url: link.data?.children[0]?.data?.url,
			thumbnail_width: link.data?.children[0]?.data?.thumbnail_width,
			thumbnail_height: link.data?.children[0]?.data?.thumbnail_height
		} as Image
	}
	return null;
}

export function getUserAgent() {
	return `${APP_NAME}/v${APP_VERSION} by ${APP_AUTHOR}`;
}
