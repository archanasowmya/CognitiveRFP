import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('Starting CognitiveRFP Server and Client...');

const server = spawn('node', ['server/server.js'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

const client = spawn('npm', ['--prefix', 'client', 'run', 'dev', '--', '--host'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  server.kill();
  client.kill();
  process.exit();
});
