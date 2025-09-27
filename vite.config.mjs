import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dynamic-quiz-app/', // <--- Important
  plugins: [react()],
});
