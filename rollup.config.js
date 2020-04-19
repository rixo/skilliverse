import svelte from 'rollup-plugin-svelte-hot'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import svg from 'rollup-plugin-svg'
import svench from 'svench/rollup'
import hmr from 'rollup-plugin-hot'

const production = !process.env.ROLLUP_WATCH

const useLiveReload = !production && !!process.env.LIVERELOAD
const hot = process.env.ROLLUP_WATCH && !useLiveReload

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },

  inlineDynamicImports: !hot,

  plugins: [
    svench.rollup({
      dir: './src/Svench',
      extensions: ['.svench', '.svelte'],
    }),

    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('public/bundle.css')
      },
      preprocess: [
        // preprocessor is only needed to automatically extracts source code
        // from View components
        svench.preprocess({
          extensions: ['.svench', '.svelte'],
        }),
      ],
      hot,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/'),
      // dedupe: ['svelte']
    }),
    commonjs(),
    svg(),
    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    useLiveReload && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    hmr({
      public: 'public',
      inMemory: true,
      // This is needed, otherwise Terser (in npm run build) chokes
      // on import.meta. With this option, the plugin will replace
      // import.meta.hot in your code with module.hot, and will do
      // nothing else.
      compatModuleHot: !hot,
    }),
  ],
  watch: {
    clearScreen: false,
  },
}
