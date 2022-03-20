<script lang="ts">
	import type { link } from "@prisma/client";
	import VirtualList from "svelte-virtual-list-ce";
	import Card from "$components/Card.svelte";

	export let links: link[];
</script>

<VirtualList items={links} let:item height="100vh">
	<Card linkId={item.redditId} />
</VirtualList>
