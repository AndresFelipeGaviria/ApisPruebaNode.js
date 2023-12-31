const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const customersRouter = require('./customers.router');
const ordersRouter = require('./orders.router');
const authRouther = require('./auth.router');
const profileRouther = require('./profile.router');



function routerApi( app ){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', ordersRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouther);
  router.use('/profile', profileRouther);


}

module.exports = routerApi;
