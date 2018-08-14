var express = require('express');
var router = express.Router();
const fs = require('fs');

function read() {
  let data = fs.readFileSync('data.json', 'utf8');
  return JSON.parse(data);
}

function save(data){
  fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf8');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = read();
  res.render('index', { data: data});
});

router.get('/add', function(req, res, next){
  res.render('add');
})

router.post('/add', function(req, res, next){
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;
  let data = read();
  data.push({id: Date.now(), string: string, integer: integer, float: float, date: date, boolean: boolean});
  save(data);
  res.redirect('/');
});

router.get('/delete/:id', function(req, res, next){
  let id = req.params.id;
  let data = read();
  data = data.filter(function(item){
    return item.id != id
  })
  save(data);
  res.redirect('/');
})

router.get('/edit/:id', function(req, res, next){
  let id = req.params.id;
  let data = read();
  data = data.filter(function(item){
    return item.id == id
  })
  res.render('edit', {item: data} );
})

router.post('/edit/:id', function(req, res, next){
  let data = read();
  let id = req.params.id;
  for (var i = 0; i < data.length; i++) {
    if(data[i].id == id){
      data[i].string = req.body.string;
      data[i].integer = req.body.integer;
      data[i].float = req.body.float;
      data[i].date = req.body.date;
      data[i].boolean = req.body.boolean;
    }
  }
  save(data);
  res.redirect('/');
})


module.exports = router;
