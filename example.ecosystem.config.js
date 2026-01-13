module.exports = {
  apps: [
    {
      name: 'nmd',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        PORT: "3001",
        NODE_ENV: 'production'
      }
    }
  ]
};
