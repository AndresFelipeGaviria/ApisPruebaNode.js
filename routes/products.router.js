
const express = require('express');

const ProductsService = require('../services/product.service');
const validatorHandler = require('./../middlewars/validator.handler');
const {createProductSchema, getProductSchema, updateProductSchema} = require('./../schemas/product.schema');

const service = new ProductsService();
//creamos una aplicacion con express

const router = express.Router();


router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter',  (req, res)=> {
  res.send('Yo soy un filter');
})

router.get('/:id', validatorHandler(getProductSchema, 'params'),
async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json(product)

  } catch (error) {
    next(error)
  }


});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct)
});


router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const {id} = req.params;

      const product = await service.update(id, body);
      res.json(product)
    } catch (error) {
      next(error)
    }

});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const product = await service.delete(id);
  res.json(product)

})


module.exports = router

