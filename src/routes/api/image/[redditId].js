import { getImage } from '../../../lib/reddit';

export async function get({ params }) {
	const [errors, item] = await getImage(params.redditId);
	console.log(errors);
	console.log(item);

	if (errors) {
		return {
			status: 400,
			body: { errors }
		};
	} else {
		return {
			body: item
		};
	}
}
