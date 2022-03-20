const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {
			colors: {
				"reddit-blue": "#13659B",
				"reddit-blue-hover": "#2980B9",
				"reddit-error": "#DD1A1A"
			}
		}
	},

	plugins: []
};

module.exports = config;
