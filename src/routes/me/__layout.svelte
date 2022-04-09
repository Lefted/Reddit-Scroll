<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ session }) {
		if (!session.username) {
			return { redirect: "/auth", status: 302 };
		}
		return {};
	}
</script>

<slot />
