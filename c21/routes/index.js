var express = require('express');
var router = express.Router();
var util = require('../helpers/util.js');

module.exports = function(pool){
  /* GET home page. */
  router.get('/', function(req, res, next) {
    let offset = req.query.of || 0;
    let currentPage = req.query.cp || 1;
    getData2(3, offset, (data) => {
      let sql = 'SELECT COUNT(id) AS count FROM data';
      pool.query(sql, (err, row) => {
        if(err) throw err;
        let page = Math.ceil(row.rows[0].count/3);
        res.render('index', {
          data: data,
          page: page,
          currentPage: currentPage
        })
      })
    })
  });

  router.get('/add', (req, res, next) => {
    res.render('add')
  })

  router.post('/add', (req, res, next) => {
    let string = req.body.string;
    let integer = req.body.integer;
    let float = req.body.float;
    let date = req.body.date;
    let boolean = req.body.boolean;
    let sql = `INSERT INTO data (id, string, integer, float, date, boolean) VALUES (${Date.now()}, '${string}', ${integer}, ${float}, '${date}', ${boolean})`;
    console.log(sql);
    pool.query(sql, (err) => {
      if (err) throw err;
      res.redirect('/')
    })
  })

  router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    let sql = `DELETE FROM data WHERE id = ${id}`;
    pool.query(sql, (err) => {
      if (err) throw err;
      res.redirect('/');
    })
  })

  router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    let sql = `SELECT * FROM data WHERE id = ${id}`;
    pool.query(sql, (err, data) => {
      if (err) throw err;
      console.log(data);
      res.render('edit', {
        data: data,
        util: util
      });
    })
  })

  router.post('/edit/:id', (req, res, next) => {
    getData((row) => {
      let id = req.params.id;
      let string = req.body.string;
      let integer = req.body.integer;
      let float = req.body.float;
      let date = req.body.date;
      let boolean = req.body.boolean;
      let sql = `UPDATE data SET string = '${string}', integer = ${integer}, float = ${float}, date = '${date}', boolean = ${boolean} WHERE id = ${id}`;
      console.log(sql);
      pool.query(sql, (err) => {
        if (err) throw err;
        res.redirect('/')
      })
    })
  })

  router.get('/search', (req, res, next) => {
    let id = req.query.id || 0;
    let string = req.query.string || 0;
    let integer = req.query.integer || 0;
    let float = req.query.float || 0;
    let sdate = req.query.sdate || 0;
    let edate = req.query.edate || 0;
    let boolean =req.query.boolean || 0;
    let arr = [];
    if(id != 0){arr.push(`id = ${id}`)}
    if(string != 0){arr.push(`string = '${string}'`)}
    if(integer != 0){arr.push(`integer = ${integer}`)}
    if(float != 0){arr.push(`float = ${float}`)}
    if(sdate != 0){arr.push(`date >= '${sdate}'`)}
    if(edate != 0){arr.push(`date <= '${edate}'`)}
    if(boolean != 0){arr.push(`boolean = ${boolean}`)}
    if(arr.length > 0){
      let sql = 'SELECT * FROM data WHERE ' + arr.join(' AND ');
      console.log(sql);
      pool.query(sql, (err, data) => {
        if(err) throw err;
        res.render('index', {
          data: data.rows,
          page: 1,
          currentPage: 1
        })
      })
    }else{
      res.redirect('/')
    }
  })

  function getData(cb){
    let sql = 'SELECT * FROM data';
    pool.query(sql, (err,row) => {
      if(err) throw err;
      cb(row.rows);
    })
  }

  function getData2(limit, offset, cb){
    let sql = `SELECT * FROM data LIMIT ${limit} OFFSET ${offset}`;
    pool.query(sql, (err,row) => {
      if(err) throw err;
      cb(row.rows);
    })
  }



  return router;
}
