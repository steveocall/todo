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

//get /todos/id

app.listen (PORT, function (){
	console.log ('Express is listen in on ' + PORT);
}); 