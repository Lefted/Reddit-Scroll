<script lang="ts">
	let username = "";
	let password = "";
	let error: string;

	async function login() {}

	async function signup() {}
</script>

<div class="grid place-items-center mt-60 px-2">
		<div class="w-60 sm:w-80">
			<h1 class="text-3xl sm:text-4xl font-bold">Login</h1>
			<form class="mt-32">
				<label for="username" class="font-bold">Username</label>
				<input
					type="text"
					name="username"
					bind:value={username}
					class="block border focus:outline-none focus:border-[3px] border-reddit-blue rounded w-full h-8 pl-0.5"
				/>
				<label for="password" class="font-bold">Password</label>
				<input
					type="text"
					name="password"
					bind:value={password}
					class="block border focus:outline-none focus:border-[3px] border-reddit-blue rounded w-full h-8 pl-0.5"
				/>
				<div class="flex gap-2">
					<button
						on:submit|preventDefault={login}
						type="submit"
						class="mt-8 bg-reddit-blue hover:bg-reddit-blue-hover text-white w-full rounded h-10"
						>Login</button
					>
					<button
						on:submit|preventDefault={signup}
						type="submit"
						class="mt-8 bg-reddit-blue hover:bg-reddit-blue-hover text-white w-full rounded h-10"
						>Signup</button
					>
				</div>
			</form>
			{#if error}
				<div class="flex mt-2">
					<svg
						width="18"
						height="15"
						viewBox="0 0 18 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="mt-1 mr-2"
					>
						<path
							d="M17.9131 14.0816L9.55644 0.306122C9.4319 0.101403 9.21695 0 9 0C8.78305 0 8.5661 0.101403 8.44356 0.306122L0.0868881 14.0816C-0.160196 14.4911 0.149161 15 0.64333 15H17.3567C17.8508 15 18.1602 14.4911 17.9131 14.0816ZM8.35718 5.66327C8.35718 5.57908 8.4295 5.5102 8.51788 5.5102H9.48211C9.5705 5.5102 9.64282 5.57908 9.64282 5.66327V9.18367C9.64282 9.26786 9.5705 9.33673 9.48211 9.33673H8.51788C8.4295 9.33673 8.35718 9.26786 8.35718 9.18367V5.66327ZM9 12.398C8.74768 12.3931 8.50743 12.2941 8.3308 12.1224C8.15418 11.9508 8.05525 11.72 8.05525 11.4796C8.05525 11.2392 8.15418 11.0084 8.3308 10.8367C8.50743 10.665 8.74768 10.5661 9 10.5612C9.25232 10.5661 9.49257 10.665 9.6692 10.8367C9.84582 11.0084 9.94475 11.2392 9.94475 11.4796C9.94475 11.72 9.84582 11.9508 9.6692 12.1224C9.49257 12.2941 9.25232 12.3931 9 12.398Z"
							fill="#DD1A1A"
						/>
					</svg>
					<p class="text-reddit-error ">{error}</p>
				</div>
			{/if}
		</div>
</div>
