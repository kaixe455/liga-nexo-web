import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		setupFiles: ['./mocks/global-mocks.js'],
		exclude: [...configDefaults.exclude, 'astro.config.mjs', 'tailwind.config.cjs'],
		coverage: {
			exclude: [...configDefaults.coverage.exclude, 'astro.config.mjs', 'tailwind.config.cjs'],
			provider: 'c8',
			reporter: ['text', 'json', 'html'],
			all: true,
			include: ['api/*']
		}
	}
})
