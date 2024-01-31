const exp = require('constants');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars').engine;
const app = express();
const path = require('path');

const route = require('./routes');
const db = require('./config/db')

// Connect db
db.connect();


app.use(methodOverride('_method'));

//HTTP Logger
app.use(morgan('combined'));

//Minddleware khi POST
app.use(
  express.urlencoded({
    extended: true,
  }),
); //XMHL từ input
app.use(express.json()); //gửi từ code js - json

//Static file: Nạp file tĩnh
app.use(express.static(path.join(__dirname, 'public'))); //__dirname -> src

app.use(methodOverride('_method'));

// template engine
app.engine('hbs', handlebars({ 
  extname: '.hbs', 
  helpers: {
    sum: (a,b) => a+b,
} }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(3000);
