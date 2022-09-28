/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// See: https://vitejs.dev/config/
// See: https://vitejs.dev/config/server-options.html#server-proxy
export default defineConfig({
	// Syntax sugar for specifying imports
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	base: '/app/',
	server: {
		port: 8080,
		strictPort: true,
		// Due to the reverse proxy being present the following
		// HMR port option is set as per NOTE in the docs
		// https://vitejs.dev/config/server-options.html#server-hmr
		hmr: {
			port: 8080
		}
	},
	preview: {
		port: 8080
	},
	plugins: [vue()],
	test: {
		include: ['tests/unit/**/*.{test,spec}.{ts,mts}']
	}
});