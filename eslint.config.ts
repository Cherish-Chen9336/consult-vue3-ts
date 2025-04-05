import { globalIgnores } from 'eslint/config'
import {
  defineConfigWithVueTs,
  vueTsConfigs
} from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  {
    rules: {
      // 使用 Prettier 自动格式化代码，设置风格偏好
      // 'prettier/prettier': [
      //   'warn', // 触发级别为 "警告"
      //   {
      //     singleQuote: true, // 使用单引号而不是双引号
      //     semi: false, // 不使用分号
      //     printWidth: 80, // 每行最大长度为 80 字符
      //     trailingComma: 'none', // 禁用尾随逗号
      //     endOfLine: 'auto', // 根据操作系统自动选择行尾符
      //   },
      // ],

      // Vue 组件名称必须是多个单词（警告 index.vue 可以是单词）
      'vue/multi-word-component-names': [
        'warn', // 触发级别为 "警告"
        {
          ignores: ['index'] // 忽略名为 "index" 的组件文件
        }
      ],

      // 允许在 <script setup> 中解构 props，不报错
      'vue/no-setup-props-destructure': ['off'], // 关闭该规则

      // 未定义的变量报错（如未引入就使用的变量）
      // 💡 默认 create-vue 项目里是关闭的，但为了演示需要这里开启
      'no-undef': 'error' // 触发级别为 "错误",
      // 'no-console': 'off'
    }
  }
)
