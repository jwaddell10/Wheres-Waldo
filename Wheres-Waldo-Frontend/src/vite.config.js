/// <reference types="vitest" />
// @vitest-environment jsdom
import { defineConfig } from "vite";
import react from "react";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",

		setupFilesAfterEnv: ["<Main>/setup-jest.js"],

		// setupFiles: ['/vitest.config.js'],
		coverage: {
			provider: "istanbul",
			reporter: ["text", "json", "html"],
		},
	},
});
