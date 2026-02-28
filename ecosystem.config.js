module.exports = {
  apps: [
    {
      name: 'linkedin-automation-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'linkedin-automation-worker',
      script: 'node_modules/tsx/dist/cli.mjs',
      args: 'worker.ts',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      restart_delay: 10000,
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
};
