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
	}
</script>

<div class="grid justify-center">
	{#await loadCard()}
		<div class="min-h-[45rem]">
			<p>loading..</p>
		</div>
	{:then card}
		<h1>{card.title}</h1>
		<img src={card.url} alt="reddit post" class="object-scale-down h-[45rem] w-[45rem]" />
	{:catch error}
		<div class="min-h-[45rem]">
			<p>{error.message}</p>
		</div>
	{/await}
</div>
