import { defineConfig } from 'astro/config'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

const web = 'https://liga-nexo-web.pages.dev'

// https://astro.build/config
export default defineConfig({
	site: web,
	server: {
		host: true
	},
	integrations: [tailwind()]
})
