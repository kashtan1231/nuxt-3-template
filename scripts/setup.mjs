import { execSync } from 'child_process'
import { writeFileSync, existsSync, rmSync, readFileSync } from 'fs'
import { resolve } from 'path'

// Checking for --force flag
const forceFlag = process.argv.includes('--force')

console.log('Setting up the project')

// Deleting directories
const directoriesToDelete = ['.nuxt', 'node_modules', '.output']

directoriesToDelete.forEach((dir) => {
  const dirPath = resolve(process.cwd(), dir)
  if (existsSync(dirPath)) {
    console.log(`deleting dir ${dir}`)
    rmSync(dirPath, { recursive: true, force: true })
  }
})

// Managing lock file
const lockFilePath = resolve(process.cwd(), 'bun.lockb')

if (forceFlag && existsSync(lockFilePath)) {
  console.log('Removing bun.lockb due to --force flag')
  rmSync(lockFilePath)
}

// Installing dependencies
if (existsSync(lockFilePath)) {
  console.log('bun.lockb found, running bun install --frozen-lockfile')
  execSync('bun install --frozen-lockfile', { stdio: 'inherit' })
} else {
  console.log('bun.lockb not found, running bun install')
  execSync('bun install', { stdio: 'inherit' })
}

// Setting up .env
const envPath = resolve(process.cwd(), '.env')
let envContent = ''

if (existsSync(envPath)) {
  envContent = readFileSync(envPath, 'utf8')
}

if (!envContent.includes('BASE_API_URL')) {
  writeFileSync(envPath, envContent + 'BASE_API_URL=https://develop.mixfame.com\n', 'utf8')
}

console.log('Setup complete')
