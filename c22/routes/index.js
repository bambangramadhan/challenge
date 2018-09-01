var express = require('express');
var router = express.Router();
var util = require('../helpers/util.js');
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var URL = 'mongodb://localhost:27017';
var dbName = 'data';

/* GET home page. */
router.get('/', function(req, res, next) {
  let offset = parseInt(req.query.of) || 0;
  let currentPage = req.query.cp || 1;
  mongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if(err) throw err;
    var db = client.db(dbName);
    db.collection('bread').find().count((err, count) => {
      if(err) throw err;
      db.collection('bread').find().skip(offset).limit(3).toArray((err, data) => {
        if (err) throw err;
        let page = Math.ceil(count/3);
        res.render('index', { data: data, page: page, currentPage: currentPage });
      })
    })
  })
});

router.get('/add', (req, res, next) => {
  res.render('add')
});

router.post('/add', (req, res, next) => {
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;
  mongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    var db = client.db(dbName);
    db.collection('bread').insertOne({
      string: `${string}`,
      integer: `${integer}`,
      float: `${float}`,
      date: `${date}`,
      boolean: `${boolean}`
    })
    res.redirect('/');
  })
});

router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  mongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    var db = client.db(dbName);
    db.collection('bread').deleteOne({
      _id: ObjectId(id)
    })
    res.redirect('/');
  })
});

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  mongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if(err) throw err;
    var db = client.db(dbName);
    db.collection('bread').find({
      _id: ObjectId(id)
    }).toArray((err, data) => {
      if (err) throw err;
      res.render('edit', { data: data });
    })
  })
});

router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;
  mongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    var db = client.db(dbName);
    db.collection('bread').updateOne({_id: ObjectId(id)}, {$set:{
      string: `${string}`,
      integer: `${integer}`,
      float: `${float}`,
      date: `${date}`,
      boolean: `${boolean}`
    }})
    res.redirect('/');
  })
});

router.get('/search', (req, res, next) => {
  let id = req.query.id || 0;
  let string = req.query.string || 0;
  let integer = req.query.integer || 0;
  let float = req.query.float || 0;
  let sdate = req.query.sdate || 0;
  let edate = req.query.edate || 0;
  let boolean =req.query.boolean || 0;
  let query = {};
  if(id != 0){query._id = ObjectId(id)};
  if(string != 0){query.string = string};
  if(integer != 0){query.integer = integer};
  if(float != 0){query.float = float};
  if(sdate!= 0){query.date = {'$gte': sdate}};
  if(edate!= 0){query.date = {'$lte': edate}};
  if(boolean != 0){query.boolean = boolean};
  if(Object.keys(query).length > 0){
    console.log(query);
    mongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
      var db = client.db(dbName);
      db.collection('bread').find(query).toArray((err, data) => {
        if (err) throw err;
        res.render('index', {
          data: data,
          page: 1,
          currentPage: 1
        })
      })
    })
  }else{
    res.redirect('/');
  }
})

module.exports = router;
