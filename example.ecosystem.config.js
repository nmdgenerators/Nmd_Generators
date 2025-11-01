module.exports = {
    apps: [
      {
        //  General
        name: 'Nmdgenerators',
        namespace: 'Production',
        script: 'index.js',
        //   Advanced features
        instances: 1,
        exec_mode: 'cluster',
        max_memory_restart: '450M',
        instance_var: 'INSTANCE_ID',
        //   Logs option
        out_file: './logs/app-out.log',
        error_file: './logs/app-error.log',
        log_file: './logs/app-log.log',
      },
    ],
  }