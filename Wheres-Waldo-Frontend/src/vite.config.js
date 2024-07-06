/// <reference types="vitest" />
// @vitest-environment jsdom
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
    // setupFiles: ['/vitest.config.js'],
		coverage: {
			provider: "istanbul",
			reporter: ["text", "json", "html"],
		},
	},
});
