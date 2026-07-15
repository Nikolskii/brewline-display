import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

// Flat config (ESLint 10). react-hooks@7 в готовом конфиге отдаёт plugins легаси-массивом,
// поэтому подключаем его вручную (плагин объектом + правила спредом). prettier — последним.
export default tseslint.config(
  { ignores: ['dist', 'src/generated', 'design'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  reactRefresh.configs.vite,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
    },
  },
  prettier,
);
