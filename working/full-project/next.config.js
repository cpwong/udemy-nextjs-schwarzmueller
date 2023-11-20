const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if ((phase = PHASE_DEVELOPMENT_SERVER)) {
    return {
      env: {
        mongodb_username: 'user',
        mongodb_password: '8koSHEpmHMGoj8Ab',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'my-site-ev',  
      },
    };
  }
  
  /* PRODUCTION ENVIRONMENT */
  return {
    env: {
      mongodb_username: 'user',
      mongodb_password: '8koSHEpmHMGoj8Ab',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'my-site',
    },
  };
};
