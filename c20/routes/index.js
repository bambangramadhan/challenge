var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bread.db');

/* GET home page. */
router.get('/', function(req, res, next) {
  let currentPage = req.query.cp || 1;
  let offset = req.query.of || 0;
  getData2(3, offset, function(data){
    let sql = 'SELECT COUNT(id) AS count FROM data';
    db.all(sql, (err, row) => {
      if (err) throw err;
      let page = Math.ceil(row[0].count/3);
      res.render('index', {data: data, page: page, currentPage: currentPage})
    })
  })
});

router.get('/add', function(req, res, next) {
  res.render('add')
})

router.post('/add', function(req, res, next) {
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;
  let sql = `INSERT INTO data (id,string,integer,float,date,boolean) VALUES (${Date.now()}, '${string}',${integer},${float},'${date}','${boolean}')`;
  console.log(sql);
  db.run(sql, function(err) {
    if(err) throw err;
    res.redirect('/');
  });
})

router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id;
  db.run(`DELETE FROM data WHERE id = ${id}`)
  res.redirect('/')
})

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  let sql = `SELECT * FROM data WHERE id = ${id}`;
  db.all(sql, (err, data) => {
    if(err) throw err;
    res.render('edit', {data: data})
  })
})

router.post('/edit/:id', function(req, res, next) {
  getData(function(row){
    let id = req.params.id;
    let string = req.body.string;
    let integer = req.body.integer;
    let float = req.body.float;
    let date = req.body.date;
    let boolean = req.body.boolean;
    db.run(`UPDATE data SET string = '${string}', integer =${integer}, float = ${float}, date = '${date}', boolean = '${boolean}' WHERE id = ${id}`);
    res.redirect('/')
  })
})

router.get('/search', function(req, res, next){
  let id = req.query.id || 0;
  let string = req.query.string || 0;
  let integer = req.query.integer || 0;
  let float = req.query.float || 0;
  let sdate = req.query.sdate || 0;
  let edate = req.query.edate || 0;
  let boolean = req.query.boolean || 0;
  let arr = [];
  if(id != 0){arr.push(`id = ${id}`)};
  if(string != 0){arr.push(`string = '${string}'`)};
  if(integer != 0){arr.push(`integer = ${integer}`)};
  if(float != 0){arr.push(`float = ${float}`)};
  if(sdate != 0){arr.push(`date >= '${sdate}'`)};
  if(edate != 0){arr.push(`date <= '${edate}'`)};
  if(boolean != 0){arr.push(`boolean = '${boolean}'`)};
  if(arr.length > 0){
    let sql = 'SELECT * FROM data WHERE ' + arr.join(' AND ');
    console.log(sql);
    db.all(sql, (err, data) => {
      if (err) throw err;
      res.render('index', {data: data, page : 1, currentPage : 1})
    })
  }else{
    res.redirect('/');
  }
})

function getData(cb){
  let sql = `SELECT * FROM data`;
  db.all(sql, (err, row) => {
    if (err) throw err;
    cb(row);
  })
}

function getData2(limit,offset,cb){
  let sql = `SELECT * FROM data LIMIT ${limit} OFFSET ${offset}`;
  db.all(sql, (err, row) => {
    if (err) throw err;
    cb(row)
  })
}

module.exports = router;
