module.exports = {
  apps : [{
    name: 'server',
    script: 'index.js',
    watch: '.',
    exec_mode: "cluster",
    instances: 1,
    log_date_format: "YYYY-MM-DD HH:mm Z",
    merge_logs: true
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};