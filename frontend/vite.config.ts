import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, './', '');
    return {
        plugins: [react(),
        tailwindcss(),
        ],
        server: {
            port: Number(env.VITE_PORT),
            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true
                }
            }
        }
    }
})
