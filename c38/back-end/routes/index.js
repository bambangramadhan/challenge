var express = require('express');
var router = express.Router();
const Data = require('../models/data');

router.get('/', function(req, res) {
  Data.find()
  .then(data => {
    res.json(data)
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.post('/', function(req, res) {
  let data = new Data({
    id: req.body.id,
    name: req.body.name,
    chat: req.body.chat
  })
  data.save().then(data => {
    res.json(data)
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.delete('/:id', function(req, res) {
  Data.findByIdAndRemove(req.params.id)
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
