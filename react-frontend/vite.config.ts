import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                ws: true
            },
        },
        host: '0.0.0.0', // หรือ IP ของเครื่องในเครือข่าย
        port: 5173, // หรือพอร์ตที่คุณใช้งาน
    },
    
});
