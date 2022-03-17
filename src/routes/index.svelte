<script lang="ts">
	import Card from "$components/Card.svelte";
	import InfiniteLoading from "svelte-infinite-loading";
	import VirtualList from "svelte-tiny-virtual-list";
	import type { link } from "@prisma/client";

	export let links: link[];

	// let loadedLinks: link[] = links.slice(0, 20);

	/// TODO dont use infinite loading, just use  the virtual list
	// save data in store, if present dont make another fetch request and load instantly

	// function infiniteHandler({ detail: { loaded, complete } }) {
	// 	loadedLinks = [...loadedLinks, ...links.slice(loadedLinks.length, loadedLinks.length + 20)];
	// 	console.log(loadedLinks);

	// 	if (loadedLinks.length == links.length) {
	// 		complete();
	// 		console.log("completet");
	// 	} else loaded();
	// }
</script>

<VirtualList width="100%" height={600} itemCount={links.length} itemSize={50}>
	<div slot="item" let:index let:style {style}>
		<!-- redditId: {links[index].redditId} -->
		<Card linkId={links[index].redditId} />
		<!-- <script>
			console.log("loading");
		</script> -->
	</div>

	<!-- <div slot="footer">
		<InfiniteLoading on:infinite{infiniteHandler} />
	</div> -->
</VirtualList>
<!-- <Card linkId="a7v5tf" /> -->
