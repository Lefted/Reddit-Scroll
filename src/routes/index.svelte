<script lang="ts">
	import Card from "$components/Card.svelte";
	import InfiniteLoading from "svelte-infinite-loading";
	import VirtualList from "svelte-tiny-virtual-list";
	import type { link } from "@prisma/client";

	export let links: link[];

	let innerHeight;
</script>

<svelte:window bind:innerHeight />

<div class="list">
	<VirtualList height={innerHeight - 20} itemCount={links.length} itemSize={500}>
		<div slot="item" let:index let:style {style}>
			<Card linkId={links[index].redditId} />
		</div>
	</VirtualList>
</div>
