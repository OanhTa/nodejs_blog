const exp = require('constants');
const express = require('express')
const morgan = require('morgan')
const handlebars = require("express-handlebars").engine;
const app = express()
const path = require('path');

//HTTP Logger
app.use(morgan('combined'))

//Static file: Nạp file tĩnh 
app.use(express.static(path.join(__dirname, 'public')))//__dirname -> src

// template engine
app.engine('hbs', handlebars({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

app.get('/', function (req, res) {
  res.render('home');
})

app.get('/news', function (req, res) {
  res.render('news');
})
app.listen(3000)