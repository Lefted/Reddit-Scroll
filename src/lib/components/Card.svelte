<script lang="ts">
	import type { Image } from "$lib/reddit";

	export let linkId: string;

	async function loadCard(): Promise<Image> {
		const res: Response = await fetch("/api/image/" + linkId);

		if (!res.ok) throw new Error(`Failed to load image: ${res.status} ${res.statusText}`);

		const image: Image = await res.json();
		if (image == null) throw new Error("Failed to parse response");

		return image;
	}
</script>

<div>
	{#await loadCard()}
		<p>loading..</p>
	{:then card}
		<h1>{card.title}</h1>
		<img src={card.url} alt="reddit post" />
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
