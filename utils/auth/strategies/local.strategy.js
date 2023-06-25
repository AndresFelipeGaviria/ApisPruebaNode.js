const  { Strategy }  = require('passport-local');

const AuthService = require('../../../api/services/auth.service');
const services = new AuthService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async(email, password, done)=> {
  try {
    const user = await services.getUser(email, password);

      done(null, user)
  } catch (error) {
    done(error, false)
  }
});

module.exports = LocalStrategy;
