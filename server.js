var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.urlencoded ({
	extended:false
}));
app.use(bodyParser.json());

app.get ('/', function(req, res) {
	res.send('Todo API root');
});

// get / todos
app.get ('/todos', function(req, res) {
	res.json(todos);
});

//get /todos/:id
app.get ('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id, 10);
	var matchedTodo;

	for (var i=0; i < todos.length; i++){
		if (todos[i].id === todoID) {
			matchedTodo = todos[i];
		} 
	} 

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

//post
app.post ('/todos', function (req, res) {
	var body = req.body;
	
	//add id field
	body.id = todoNextId++;
	
	//push body into array
	todos.push(body);
	
	res.json(body);
});

app.listen (PORT, function (){
	console.log ('Express is listen in on ' + PORT);
}); 