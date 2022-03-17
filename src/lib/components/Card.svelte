<script lang="ts">
	import { linkStore } from "../../stores";
	import type { Image } from "$lib/reddit";

	export let linkId: string;

	async function loadCard(): Promise<Image> {
		// return cached
		if ($linkStore[linkId]) return $linkStore[linkId];

		console.log("fetching image");
		const res: Response = await fetch("/api/image/" + linkId);

		if (!res.ok) throw new Error(`Failed to load image: ${res.status} ${res.statusText}`);

		const image: Image = await res.json();
		if (image == null) throw new Error("Failed to parse response");

		$linkStore[linkId] = image;
		return image;
		// const image =  {
		// 	thumbnail_height: 60,
		// 	thumbnail_width: 60,
		// 	title: "test",
		// 	url: "https://discountdoorhardware.ca/wp-content/uploads/2016/12/test-product-1.png"
		// } as Image;
		// $linkStore[linkId] = image;
		// return image;
	}
</script>

{#await loadCard()}
	<p>loading..</p>
{:then card}
	<h1>{card.title}</h1>
	<img src={card.url} alt="reddit post" class="object-scale-down w-[45rem]" />
{:catch error}
	<p>{error.message}</p>
{/await}
