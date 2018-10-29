var express = require('express');
var router = express.Router();
var Redux = require('../models/redux');

/* GET home page. */
router.get('/', function(req, res) {
  Redux.find()
  .then(data => {
    res.json(data);
  })
});

router.post('/', (req, res) => {
  let redux = new Redux({
    id: req.body.id,
    name: req.body.name,
    phone: req.body.phone
  })
  redux.save().then(data => {
    res.json({
      status: 'SUCCESS',
      data: {
        id: data.id,
        name: data.name,
        phone: data.phone
      }
    })
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  Redux.findOneAndUpdate({id: id}, {
    name: req.body.name,
    phone: req.body.phone
  }, {new: true})
  .then(data => {
    if(!data){
      res.json({error: true, message: `name with id : ${id} not found`})
    }else {
      res.json({
        status: 'SUCCESS',
        data: {
          name: data.name,
          phone: data.phone
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.delete('/:id', (req, res) => {
  let id = req.params.id
  Redux.findOneAndRemove({id: id})
  .then(data => {
    if(!data){
      res.json({error: true, message: `name with id : ${id} not found`})
    }else {
      res.json({
        status: 'SUCCESS',
        data: {
          name: data.name,
          phone: data.phone
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

module.exports = router;
