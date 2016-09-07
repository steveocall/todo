var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	description: 'task 1',
	completed: false
}, {
	id: 2,
	description: 'task 2',
	completed: false
}, {
	id: 3,
	description: 'task 3',
	completed: true
}]

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

app.listen (PORT, function (){
	console.log ('Express is listen in on ' + PORT);
}); 