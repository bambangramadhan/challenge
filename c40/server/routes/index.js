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
    title: req.body.title
    rate: req.body.rate,
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    detailProduct: req.body.detailProduct
  })
  product.save().then(data => {
    res.json({
      status: 'SUCCESS',
      data: {
        title: data.title,
        rate: data.rate,
        description: data.description,
        price: data.price,
        brand: data.brand,
        detailProduct: data.detailProduct
      }
    })
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

module.exports = router;
