/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		screens: {
			mobile: '300px',
			// => @media (min-width: 300px) { ... }

			desktop: '600px'
			// => @media (min-width: 1280px) { ... }
		}
	},
	plugins: [require('daisyui')]
};

module.exports = config;
