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

<div class="grid place-items-center mt-40 md:mt-60 px-2">
	<div>
		<h1 class="text-3xl sm:text-4xl font-bold">The database is locked</h1>
		<form on:submit|preventDefault={validateSecret} class="mt-32">
			<label for="key" class="font-bold">Enter key</label>
			<input
				type="text"
				name="key"
				bind:value={input}
				class="block border focus:outline-none  focus:border-[3px] border-reddit-blue rounded w-full h-8 pl-0.5"
			/>
			<button
				type="submit"
				class="mt-8 bg-reddit-blue hover:bg-reddit-blue-hover text-white w-full rounded h-10"
				>Unlock</button
			>
		</form>
	</div>
</div>
