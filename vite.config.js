import { cp, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

function copyStandaloneTasks() {
  return {
    name: 'copy-standalone-tasks',
    apply: 'build',
    async writeBundle(outputOptions) {
      const outputDirectory = outputOptions.dir ?? resolve(projectRoot, 'dist')
      const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4']
      await mkdir(outputDirectory, { recursive: true })
      await Promise.all(tasks.map((task) => cp(
        resolve(projectRoot, task),
        resolve(outputDirectory, task),
        {
          recursive: true,
          filter: (source) => !source.toLowerCase().endsWith('.pdf'),
        },
      )))
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), copyStandaloneTasks()],
})
