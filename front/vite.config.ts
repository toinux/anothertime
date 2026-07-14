import { defineConfig, lazyPlugins } from 'vite-plus';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  lint: {
    "plugins": [
      "react",
      "typescript",
      "oxc"
    ],
    "rules": {
      "react/rules-of-hooks": "error",
      "react/only-export-components": [
        "warn",
        {
          "allowConstantExport": true
        }
      ],
      "vite-plus/prefer-vite-plus-imports": "error"
    },
    "options": {
      "typeAware": true,
      "typeCheck": true
    },
    "jsPlugins": [
      {
        "name": "vite-plus",
        "specifier": "vite-plus/oxlint-plugin"
      }
    ]
  },
  fmt: {
    "trailingComma": "none",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true,
    "sortTailwindcss": {},
    "printWidth": 120,
    "sortPackageJson": false,
    "ignorePatterns": [
      "/*",
      "!/src/",
      "/src/components/ui"
    ]
  },
  plugins: lazyPlugins(() => [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()]),
  resolve: {
      alias: {
          '@': path.resolve(__dirname, './src')
      }
  },
  server: {
      proxy: {
          '^/(config|save|load|icons)': process.env.BASE_URL || 'http://localhost:8080'
      }
  }
});
