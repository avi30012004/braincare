import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const envKeys = Object.keys(env).reduce((prev, next) => {
    return { ...prev, [`import.meta.env.${next}`]: JSON.stringify(env[next]) };
  }, {});

  return {
    define: envKeys,
    plugins: [react()],
  };
});
