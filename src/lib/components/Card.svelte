<script>
	export let postId;

	async function loadCard() {
		const res = await fetch('/api/image/' + postId);
		const text = await res.text();
		console.log(res);
		const json = JSON.stringify(res);

		console.log(json);
		if (res.ok) {
			return JSON.parse(text);
		} else {
			throw new Error(text);
		}
	}
</script>

<div>
	{#await loadCard()}
		<p>loading..</p>
	{:then card}
		<h1>{card.title}</h1>
		<img src={card.imgUrl} alt="reddit post" />
	{:catch error}
		<p>{error}</p>
	{/await}
</div>
