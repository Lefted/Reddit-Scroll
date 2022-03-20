<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: `${status} Error`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<div class="grid place-items-center h-screen p-2">
	<div class="flex place-items-center">
		<h1 data-text={title} class="text-4xl sm:text-6xl font-bold italic mr-8 sm:mr-12">{title}</h1>
		<div class="scale-75 sm:scale-100 pt-2">
			<svg
				width="145"
				height="168"
				viewBox="0 0 145 168"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect y="155.5" width="145" height="12" rx="6" fill="#DD1A1A" />
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M44.5146 74L34.7678 107H113.832L104.386 74H44.5146ZM52.4893 47H96.6574L85.1028 6.63478C82.0748 -2.95231 66.4299 -1.43855 64.4112 6.63478L52.4893 47ZM20 157L26.7932 134H121.561L128 156.495L20 157Z"
					fill="#DD1A1A"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M113.832 107H34.7678L26.7932 134H121.561L113.832 107Z"
					fill="#C4C4C4"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M96.6574 47L52.4892 47L44.5146 74H104.386L96.6574 47Z"
					fill="#C4C4C4"
				/>
			</svg>
			<svg
				width="145"
				height="142"
				viewBox="0 0 145 142"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="reflection"
			>
				<g opacity="0.43">
					<rect
						width="145"
						height="10.1373"
						rx="5.06866"
						transform="matrix(1 0 0 -1 0 10.6372)"
						fill="#DD1A1A"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M44.5145 79.4865L34.7678 51.6088H113.832L104.386 79.4865H44.5145ZM52.4891 102.295H96.6572L85.1028 136.395C82.0748 144.494 66.4299 143.215 64.4112 136.395L52.4891 102.295ZM20 9.36993L26.7932 28.7998H121.561L128 9.79622L20 9.36993Z"
						fill="#DD1A1A"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M113.832 51.6088H34.7678L26.7932 28.7998H121.561L113.832 51.6088Z"
						fill="#C4C4C4"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M96.6571 102.295H52.489L44.5144 79.4865H104.386L96.6571 102.295Z"
						fill="#C4C4C4"
					/>
				</g>
			</svg>
		</div>
	</div>
</div>

<style>
	/* Reflection */
	h1 {
		position: relative;
	}
	h1::after {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		transform: scale(1, -1);
		transform-origin: bottom;
		line-height: 0.8em;
		opacity: 0.6;
	}

	.reflection {
		position: relative;
		bottom: 1px;
	}
</style>
