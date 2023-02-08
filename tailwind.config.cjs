/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				nexo: {
					DEFAULT: '#7541e4'
				}
			},
			fontFamily: {
				body: ['Anybody', 'system-ui', 'sans-serif'],
				black: ['Anybody Black', 'system-ui', 'sans-serif']
			},
			backgroundImage: {
				'ucam-tokiers-academy': 'linear-gradient(90deg, #004379 37%, 62.9447%, #eca900 100%)',
				'bis-esports': 'linear-gradient(90deg, #193936 37%, 62.9447%, #dad5d3 100%)',
				'taurus-esports': 'linear-gradient(90deg, #fe0000 37%, 62.9447%, #ffffff 100%)',
				'kawaii-kiwis': 'linear-gradient(90deg, #ff4f74 37%, 62.9447%, #00ff00 100%)',
				stormbringers: 'linear-gradient(90deg, #c63552 37%, 62.9447%, #0078a5 100%)',
				ecorp: 'linear-gradient(90deg, #e2b533 37%, 62.9447%, #030304 100%)',
				'phlox-gaming': 'linear-gradient(90deg, #ebf2f7 37%, 62.9447%, #180015 100%)',
				'magna-esports': 'linear-gradient(90deg, #02fcfa 37%, 62.9447%, #484848 100%)',
				'oxygen-valiants': 'linear-gradient(90deg, #12aded 37%, 62.9447%, #fb2774 100%)',
				'tdc-esports': 'linear-gradient(90deg, #ffdf12 37%, 62.9447%, #131313 100%)'
			}
		}
	},
	safelist: [
		'bg-ucam-tokiers-academy',
		'bg-bis-esports',
		'bg-taurus-esports',
		'bg-kawaii-kiwis',
		'bg-stormbringers',
		'bg-ecorp',
		'bg-magna-esports',
		'bg-phlox-gaming',
		'bg-oxygen-valiants',
		'bg-tdc-esports'
	],
	plugins: []
}
