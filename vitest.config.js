/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        Vue(),
    ],
    test: {
        globals: true,
        environment: 'happy-dom',
        //exclude: [...configDefaults.exclude, 'src/firebase/config.js']
    },
})