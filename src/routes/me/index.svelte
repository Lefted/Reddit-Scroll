<script lang="ts">
	import { session } from "$app/stores";
	let username = $session.username;
</script>

<p>You're logged in as {username}</p>