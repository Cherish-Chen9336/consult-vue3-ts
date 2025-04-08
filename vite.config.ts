import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// 配置 svg 模块
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      dts: false, // 不自动生成类型声明文件
      resolvers: [VantResolver({ importStyle: false })] // 不引入样式
    }),
    createSvgIconsPlugin({
      // 文件路径
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  // base: '/xiaoputao',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
