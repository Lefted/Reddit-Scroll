<script lang="ts">
	import { goto } from "$app/navigation";

	import { getLogger } from "$lib/utils/logging";

	let input: string = "";

	async function validateSecret() {
		const res = await fetch("/api/decrypt", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				key: input
			})
		});

		if (!res.ok) {
			getLogger("decrypt").error(await res.text());
			return;
		}

		await goto("/");
	}
</script>

<div>
	<form on:submit|preventDefault={validateSecret}>
		<label for="key">Enter key</label>
		<input type="text" name="key" bind:value={input} />
		<button type="submit">Next</button>
	</form>
</div>
