var express = require("express")
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var request = require("request");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/scrape", function(req, res){
	var $ = cheerio.load(response.data);

$("frow-container h2").each(function(i, element){
	var result = {}

	result.title = $(this)
		.children("a")
		.text();

	result.link	= $(this)
		.children("a")
		.attr("href");
});

db.Article.create(result)
.then(function(dbArticle){
	console.log(dbArticle);
})
.catch(function(err){
	return res.json(err);
	});	

	res.send("Scrape completed!")
});

app.get("/articles", function(req, res){
	db.Article.find({})
		.then(function(dbArticle){
			res.json(dbArticle);
		})
		.catch(function(err){
			return res.json(err);
		});
});

app.post("/articles/:id", function(req, res) {

  db.Note.create(req.body)
    .then(function(dbNote) {

      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {

      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
