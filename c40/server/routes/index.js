var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res) {
  Product.find()
  .then(data => {
    res.json(data);
  })
});

router.post('/', (req, res) => {
  let product = new Product({
    id: req.body.id,
    title: req.body.title,
    rate: req.body.rate,
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    dproduct: req.body.dproduct
  })
  product.save().then(data => {
    res.json({
      status: 'SUCCESS',
      data: {
        id: data.id,
        title: data.title,
        rate: data.rate,
        description: data.description,
        price: data.price,
        brand: data.brand,
        dproduct: data.dproduct
      }
    })
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.get('/:id', function(req, res) {
  Product.findOne({
    id: req.params.id
  })
  .then(data => {
    if(!data){
      res.json({error: true, message: `note with id : ${id} not found`})
    }else {
      res.json(data)
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

module.exports = router;
