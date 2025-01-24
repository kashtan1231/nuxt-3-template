import { execSync } from 'child_process'
import { writeFileSync, existsSync, rmSync, readFileSync } from 'fs'
import { resolve } from 'path'

// Checking for --force flag
const forceFlag = process.argv.includes('--force')

console.log('Setting up the project')

// Setting up .env
const envPath = resolve(process.cwd(), '.env')
let envContent = ''

if (existsSync(envPath)) {
  envContent = readFileSync(envPath, 'utf8')
}

if (!envContent.includes('HTTPS=')) {
  const readline = await import('readline/promises')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const answer = await rl.question('Do you want to use HTTPS? (y - yes/n - no): ')
  const httpsValue = answer.toLowerCase().startsWith('y') ? 'true' : 'false'

  envContent += `HTTPS=${httpsValue}`
  writeFileSync(envPath, envContent)

  rl.close()
}

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

console.log('Setup complete')
