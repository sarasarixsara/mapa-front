import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ElementPlus(),
    vue(),
    federation({
      name: 'frontend-main',
      filename: 'remoteEntry.js',
      exposes: {
          './MainPage': './src/pages/MainPage.vue',
      },
      shared: ['vue', 'pinia']
    })
  ],
  build: {
    minify: false,
    target: ["chrome89", "edge89", "firefox89", "safari15"]
 }
})
