/*var express = require('express')
var app = express()

app.use(express.static('www'));

var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)

})*/

/*
const express = require('express');
const app = express();
const path = require('C:\\Users\\Hamza\\Desktop');
const router = express.Router();

router.get('/index',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/checkout',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

router.get('/product',function(req,res){
  res.sendFile(path.join(__dirname+'/product.html'));
});

//add the router
app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
*/
/*
const express = require('express');
const app = express();
const path = require("C:\\Users\\Hamza\\Desktop");
const router = express.Router();

router.get('/index',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/checkout',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

router.get('/product',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');*/

const express = require('express');

var app = express();

app.get("/", function(req,res){
	res.send("this is home page");
});

app.listen(3000);

