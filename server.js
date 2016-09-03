var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
var request = require('request');
var httpStatus = require('http-status-codes');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var app = express();

// Middleware
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use('/admin', function(req, res) {
	res.render('admin');
});

app.use('/user', function(req, res) {
	res.render('user');
});

app.get('/users/all', function(req, res) {
	var baseURL = process.env.API_URL || "https://biobots-api.herokuapp.com";
	var url = baseURL + "/users/all";
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.status(httpStatus.OK).json(body);
	  } else {
	  	console.log(error);
	  }
	})
})

app.get('/users/:email', function(req, res) {
	var email = req.params.email;
	var baseURL = process.env.API_URL || "https://biobots-api.herokuapp.com";
	var url = baseURL + "/users/" + email + "/prints";
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.status(httpStatus.OK).json(body);
	  } else {
	  	console.log(error);
	  }
	})
})

app.use('*', function(req, res) {
  res.status(httpStatus.NOT_FOUND).send('Invalid endpoint or REST action');
});

console.log('Listening on port: ' + port);
app.listen(port);
