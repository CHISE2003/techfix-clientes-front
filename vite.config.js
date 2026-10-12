// Configuración de Vite para un proyecto React.
// El proxy reenvía las peticiones /api al backend de Spring Boot (puerto 8080),
// de modo que el navegador solo habla con localhost:5173 y no se presentan errores de CORS.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
});
