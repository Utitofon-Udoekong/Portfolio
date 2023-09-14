import { fileURLToPath, URL } from 'node:url'
import { unheadVueComposablesImports } from '@unhead/vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        unheadVueComposablesImports,
      ],
      dts: './auto-imports.d.ts',
      dirs: [
        // './composables/**',
        './src/components'
      ],
      injectAtEnd: true,
      vueTemplate: true
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
