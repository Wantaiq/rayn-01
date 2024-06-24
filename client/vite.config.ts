import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: `${path.resolve(__dirname, './src/components/')}`,
      types: `${path.resolve(__dirname, './src/types/')}`,
      context: `${path.resolve(__dirname, './src/context/')}`,
      hooks: `${path.resolve(__dirname, './src/hooks/')}`,
    },
  },
});
