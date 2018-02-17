var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('mongodb://TyroneHunt:Coding51@ds113455.mlab.com:13455/tradingapp', ['trades']);
var ObjectID = mongojs.ObjectID;
var app = express();

// View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static path
app.use(express.static(path.join(__dirname,'public')));

// Global Vars
app.use(function(req, res, next){
  res.locals.errors = null;
  next();
});

// Express Validator Middleware
app.use(expressValidator());

app.get('/', function(req, res){
db.trades.find(function (err, docs) {
  console.log(docs);
  res.render('index', {
      title: 'Trades',
      trades: docs
    });
    })
});


app.post('/trades/add', function(req, res){

  req.checkBody('btc','BTC amount is required').notEmpty();
  req.checkBody('usd','USD amount is required').notEmpty();
  req.checkBody('trade_date','Trade date is required').notEmpty();

var errors = req.validationErrors();

if(errors){
    res.render('index', {
      title: 'Trades',
      trades: trades,
      errors: errors
    });
} else {
  var newTrade = {
      btc: req.body.btc,
      usd: req.body.usd,
      trade_date: req.body.trade_date
  }

  db.trades.insert(newTrade, function(err, result){
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
}
});

app.delete('/trades/delete/:id',function(req,res){
  db.trades.remove({_id: ObjectID(req.params.id)}, function(err, result){
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
});

app.listen(3000, function(){
  console.log('Server started on Port 3000...');
})
