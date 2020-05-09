var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

const cors = require('cors')
var DBInitilizer=require('./services/db/DBInitializer')
var Auth=require('./services/auth/auth').auth;
require('dotenv').config();
DBInitilizer.Initialize(app);
Auth.initialize(app);
Auth.SetStrategy();
app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set( 'superSecret',  process
.env.SECRET_KEY);
var port = process.env.PORT || 8000;

var v1Router = require('./routes/v1/index');

app.use('/api/v1', v1Router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);

module.exports=app;