
const express = require('express');

const UsersService = require('../services/users.service');
const service = new UsersService();
const router = express.Router();


router.get('/', (req, res) => {
  const users = service.find()
  return res.json(users)
})

module.exports = router
