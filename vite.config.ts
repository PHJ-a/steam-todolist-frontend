import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // https 환경에서 개발할 때 사용
    // basicSsl({
    //   domains: ['api.todos-steams-project.site', 'todos-steams-project.site'],
    // }),
  ],
});
