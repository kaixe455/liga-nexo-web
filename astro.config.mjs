import { defineConfig } from 'astro/config'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
import cloudflare from '@astrojs/cloudflare'

const web = 'liga-nexo-web.pages.dev'

// https://astro.build/config
export default defineConfig({
	site: web,
	server: {
		host: true
	},
	integrations: [tailwind()],
	output: 'server',
	adapter: cloudflare()
})
