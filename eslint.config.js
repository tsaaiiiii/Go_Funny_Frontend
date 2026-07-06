import antfu from '@antfu/eslint-config'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'

export default antfu(
  {
    type: 'app',
    react: true,
    typescript: true,
    ignores: ['dist', 'src/components/ui', 'src/routeTree.gen.ts'],
  },
  ...pluginQuery.configs['flat/recommended'],
  ...pluginRouter.configs['flat/recommended'],
  {
    files: ['src/routes/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{
          group: ['../*'],
          message: '禁止跨資料夾使用相對路徑，請改用 @/ alias',
        }],
      }],
    },
  },
)
