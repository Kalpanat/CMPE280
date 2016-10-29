var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var path    = require("path");

var app = express();
app.use(bodyParser.json())

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/registration.html'));
});

app.post('/process', function (req, res, next) {  
 	console.log("Reached in Server");

   	console.log("It's located in " + __dirname);
   	var url = '';
   	MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
   		  console.log('Connection established to', url);
   		  var document = {name:req.body.userid, password:req.body.password, email:req.body.email, ques1:req.body.ques1, ans1:req.body.ans1, ques2:req.body.ques2, ans2:req.body.ans2, mobile:req.body.mobile, address:req.body.address, extra_info:req.body.extra_info};
			db.collection('newcol').insert(document, function(err, records) {
				if (err) throw err;
				console.log("Record added as ");
			});
    	  db.close();
  		}
	});
    res.status(200).send("Sucessfully Registered! Data saved to DB!"); 
});

var server = http.createServer(app).listen(5000, function(err) {
  if (err) {
    console.log(err);
  } else {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Server listening on ${host}:${port}`);
  }
});