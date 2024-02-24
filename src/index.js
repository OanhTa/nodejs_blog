const exp = require('constants');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars').engine;
const app = express();
const path = require('path');

const SortMiddleware = require('./app/middleware/SortMiddleware')

const route = require('./routes');
const db = require('./config/db')

// Connect db
db.connect();


app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware);

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
    sortable: (field, sort)=>{

      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'fa-solid fa-sortfa-solid fa-sort',
        asc: 'fa-solid fa-arrow-down-wide-short',
        desc: 'fa-solid fa-arrow-up-wide-short'
      };

      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc',//Bấm vào xếp ngược lại

      }

      const icon = icons[sortType];
      const type = types[sortType];

      return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
              </a>`
    }
} }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(3000);
