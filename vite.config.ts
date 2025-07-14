export default defineConfig((config) => {
  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    build: {
      target: 'esnext',
    },
    server: {
      host: true,
      port: 5173,
      allowedHosts: ['bolt.ibo.ma'], // ✅ هنا
    },
    plugins: [
      nodePolyfills({ /* ... */ }),
      {
        name: 'buffer-polyfill',
        transform(code, id) { /* ... */ },
      },
      config.mode !== 'test' && remixCloudflareDevProxy(),
      remixVitePlugin({ /* ... */ }),
      UnoCSS(),
      tsconfigPaths(),
      chrome129IssuePlugin(),
      config.mode === 'production' && optimizeCssModules({ apply: 'build' }),
    ],
    envPrefix: [
      'VITE_',
      'OPENAI_LIKE_API_BASE_URL',
      'OLLAMA_API_BASE_URL',
      'LMSTUDIO_API_BASE_URL',
      'TOGETHER_API_BASE_URL',
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };
});
