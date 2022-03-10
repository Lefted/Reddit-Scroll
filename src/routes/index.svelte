<script lang="ts">
	import InfiniteLoading from 'svelte-infinite-loading';
	import VirtualList from 'svelte-tiny-virtual-list';
	import Card from '../lib/components/Card.svelte';

	export let posts;
	// console.log(posts);

	let data = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z'
	];

	function infiniteHandler({ detail: { complete, error } }) {
		try {
			// http request here

			const newData = [
				'G',
				'H',
				'I',
				'J',
				'K',
				'L',
				'M',
				'N',
				'O',
				'P',
				'Q',
				'R',
				'S',
				'T',
				'U',
				'V',
				'W',
				'X',
				'Y',
				'Z'
			];

			data = [...data, ...newData];
			complete();
		} catch (e) {
			error(e);
		}
	}
</script>

<!-- <VirtualList width="100%" height={600} itemCount={data.length} itemSize={50}>
	<div slot="item" let:index let:style {style}>
		Letter: {data[index]}, Row: #{index}
	</div>
	<InfiniteLoading on:infinite{infiniteHandler} />
	<div slot="footer" />
</VirtualList> -->
<Card postId="a7v5tf" />
