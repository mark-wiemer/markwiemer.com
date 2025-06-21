/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react()],
    test: {
        globals: true,
        // Unit tests include render tests, so we use jsdom for everything
        // This code will run in a browser anyway :)
        environment: "jsdom",
        setupFiles: "./src/test/setup.ts",
        include: ["**/*.test.?(c|m)[jt]s?(x)"],
    },
    server: {
        port: 8080,
    },
    build: {
        outDir: "../../../site/politics/trump-litigation",
        emptyOutDir: true,
    },
});
