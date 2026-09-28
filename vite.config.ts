import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const currentDir = import.meta.dirname || path.resolve('.');

function aiAssistantPlugin() {
  return {
    name: 'ai-assistant-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/ai-assistant', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        let bodyStr = '';
        req.on('data', (chunk: any) => {
          bodyStr += chunk;
        });
        req.on('end', async () => {
          try {
            const body = bodyStr ? JSON.parse(bodyStr) : {};
            const { handleAiAssistantRequest } = await import('./api/aiAssistantHandler.ts');
            const result = await handleAiAssistantRequest(body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              text: 'The advisory service is currently unavailable. Please connect via WhatsApp or try again shortly.',
              error: err?.message,
            }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  const port = Number(process.env.PORT) || 3000;

  return {
    plugins: [react(), tailwindcss(), aiAssistantPlugin()],
    resolve: {
      alias: {
        '@/data': path.resolve(currentDir, './data'),
        '@/utils': path.resolve(currentDir, './utils'),
        '@/components': path.resolve(currentDir, './src/components'),
        '@/pages': path.resolve(currentDir, './src/pages'),
        '@': path.resolve(currentDir, './src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: port,
      host: '0.0.0.0',
      allowedHosts: true as const,
    },
  };
});
