var express = require('express'),
mongoose = require('mongoose'),
path = require('path'),
app = express(),
Task = require('./api/models/todoListModel'),
bodyParser = require('body-parser'),	//obsługa http post 
port = process.env.PORT || 3000,
morgan = require('morgan');

app.use(morgan('dev'));
// Połączenie z bazą
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ToDodb', { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, './api/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './api/public')));

//routing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var routes = require('./api/routes/todoListRoutes');
routes(app);

// Start aplikacji
app.listen(port);
console.log('todo list RESTful API server started on: ' + port);

//404
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});