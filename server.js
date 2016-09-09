// todo

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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
	var matchedTodo = _.findWhere(todos, {id: todoID});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

//post
app.post ('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(404).send();
	}
	
	//trim body.description
	body.description = body.description.trim();

	body.id = todoNextId++;
	
	todos.push(body);
	
	res.json(body);
});

//delete /todos/:id
app.delete ('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoID});

	if (!matchedTodo) {
		res.status(404).json({"error": "No todo found with that ID"});
	} else {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}
});

app.listen (PORT, function (){
	console.log ('Express is listen in on ' + PORT);
}); 
