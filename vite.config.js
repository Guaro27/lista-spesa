import { randomUUID } from 'node:crypto'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
const version = randomUUID()

export default defineConfig({
  define: { 'import.meta.env.APP_VERSION': JSON.stringify(version) },
  plugins: [
    react(),
    {
      name: 'app-version',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'version.json',
          source: JSON.stringify({ version }),
        })
      },
    },
  ],
})
