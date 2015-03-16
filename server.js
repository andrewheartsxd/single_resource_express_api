'use strict';
var express = require('express');
var mongoose = require('mongoose');
var heroRoutes = require('./routes/heroRoutes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/heroesapp_development');

var app = express();
app.use(express.static(__dirname + '/build'));

var router = express.Router();

heroRoutes(router);

app.use('/api/v1', router);

app.listen(3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
