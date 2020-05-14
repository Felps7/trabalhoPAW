const express = require('express');
const createError = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var pedidosRouter = require('./routes/pedidos');
var apiPedidosRouter = require('./routes/apiPedidos');
var apiUsers = require('./routes/apiUsers');

//init app
const app = express();

mongoose.connect('mongodb://localhost/saude24');
let db = mongoose.connection;

//check connection
db.once('open', function(){
    console.log('Connected to MongoDB...');
});

//check errors in db
db.on('error', function(err){
    console.log(err);
});

//bring in models
let Pedido = require('./models/pedido');

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body parser m iddleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', pedidosRouter);
app.use('/pedidosV1', apiPedidosRouter);
app.use('/usersV1', apiUsers);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


//start server
app.listen(3000, function(){
    console.log("Server inicializado na porta 3000");
});

module.exports = app;
