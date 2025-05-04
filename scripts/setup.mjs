import { execSync } from 'child_process'
import { writeFileSync, existsSync, rmSync, readFileSync } from 'fs'
import { resolve } from 'path'

// Checking for --force flag
const forceFlag = process.argv.includes('--force')

console.log('Setting up the project')

// Setting up .env
const envPath = resolve(process.cwd(), '.env')
let envContent = existsSync(envPath) ? readFileSync(envPath, 'utf8') : ''

if (!envContent.includes('BASE_API_URL')) {
  envContent += 'BASE_API_URL=https://example.com\n'
  writeFileSync(envPath, envContent, 'utf8')
}

if (!envContent.includes('BASE_URL')) {
  envContent += 'BASE_URL=https://example.com\n'
  writeFileSync(envPath, envContent, 'utf8')
}

if (!envContent.includes('NODE_ENV')) {
  envContent += 'NODE_ENV=development\n'
  writeFileSync(envPath, envContent, 'utf8')
}

if (!envContent.includes('HTTPS=')) {
  const readline = await import('readline/promises')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const answer = await rl.question('Do you want to use HTTPS? (y - yes/n - no): ')
  const httpsValue = answer.toLowerCase().startsWith('y') ? 'true' : 'false'

  envContent += `HTTPS=${httpsValue}\n`
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
const lockFilePath = resolve(process.cwd(), 'bun.lock')

if (forceFlag && existsSync(lockFilePath)) {
  console.log('Removing bun.lock due to --force flag')
  rmSync(lockFilePath)
}

// Installing dependencies
if (existsSync(lockFilePath)) {
  console.log('bun.lock found, running bun install --frozen-lockfile')
  execSync('bun install --frozen-lockfile', { stdio: 'inherit' })
} else {
  console.log('bun.lock not found, running bun install')
  execSync('bun install', { stdio: 'inherit' })
}

console.log('Setup complete')
