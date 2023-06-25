const  boom  = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const UserService = require('./users.service');
const { config } = require('../../config/config');
const services = new UserService();


class AuthService {

  async getUser(email, password){
    const user = await services.findEmail(email);
    if(!user){
      throw boom.unauthorized()
    }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        throw boom.unauthorized()
      }
      delete user.dataValues.password;
      return user;
  }

   signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return{
      user,
      token
    }
  };

  async sendRecovery(email){
    const user = await services.findEmail(email);
    if(!user){
      throw boom.unauthorized()
    }
    const payload = {sub: user.id};
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`
    const mail = {
      from: config.smtpEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email para recuperar contraseña", // Subject line
      // text: "Hola Andresitooo", // plain text body
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail)
    return rta
  }

  async sendMail(infoMail) {

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
       //para gmail que es algo seguro utilizar el port 465 y poner secure:true si no port: 587 y secure:false
        port: 465,
        auth: {
            user: config.smtpEmail,
            pass: config.smtpPassword
        }
      });
      await transporter.sendMail(infoMail);
      return {message: 'mail sent'}
    }
};

module.exports = AuthService
