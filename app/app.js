var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var v1Router = require('./routes/v1/index');
app.use('/api/v1/', v1Router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);