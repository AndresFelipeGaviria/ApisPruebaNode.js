const boom = require('@hapi/boom');

const { config }  = require('../../config/config')

function checkApikey(req, res, next) {
  const apikey = req.headers['api'];
  if(apikey === config.apiKey){
    next()
  }else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {

  const user = req.user;
  console.log(req.user)
  if(user.role === 'admin'){
    next()
  }else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    console.log(roles)
    console.log(req.user)
    const user = req.user;
    if(roles.includes(user.role)){
      next()
    }else {
      next(boom.unauthorized());
    }
  }
}

module.exports = { checkApikey, checkAdminRole, checkRoles }
