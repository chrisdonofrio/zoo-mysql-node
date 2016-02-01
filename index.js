var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoo_db'
});

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        };
        console.log('connected as id ' + connection.threadId);
    });

var prompt = require('prompt');
prompt.start();
prompt.message = ""

var zoo = {
	welcome : function() {
		console.log('Welcome to the Zoo And Friends App~!');
	}
	menu: function() {
		console.log('Enter (A): ------> to Add a new animal to the Zoo!');
		console.log('\n');
		console.log('Enter (U): ------> to Update info on an animal in the Zoo!');
		console.log('\n');
		console.log('Enter (V): ------> to Visit the animals in the Zoo!');
		console.log('\n');
		console.log('Enter (D): ------> to Adopt an animal from the Zoo!');
		console.log('\n');
		console.log('Enter (Q): ------> to Quit and exit the Zoo!');
	}
	add : function(input_scope) {
		var currentScope = input_scope;
		console.log('To add an animal to the zoo please fill out the following form for us!');
		prompt.get(['->', 'name', 'type', 'age'], function(err, result) {
			connection.query( function(err, results) {
			  if (err) throw err;
			});
		}
		currentScope.menu();
		currentScope.promptUser();
	}
	visit : function() {
		console.log('Enter (I): ------> do you know the animal by it’s id? We will visit that animal!');
		console.log('Enter (N): ------> do you know the animal by it’s name? We will visit that animal!');
		console.log('Enter (A): ------> here’s the count for all animals in all locations!');
		console.log('Enter (C): ------> here’s the count for all animals in this one city!');
		console.log('Enter (O): ------> here’s the count for all the animals in all locations by the type you specified!');
		console.log('Enter (Q): ------> Quits to the main menu!');
		currentScope.visit();
		currentScope.view(currentScope);
	}
	view : function() {
		function add(input_scope) {
			var currentScope = input_scope;
			console.log('Please choose what you like to visit!');
			prompt.get(['->', 'visit'], function(err, result) {
				if (result.visit === 'Q') {
					currentScope.menu();
				}
				else if (result.visit === 'O') {
					currentScope.type(input_scope);
				}
				else if (result.type === 'I') {
					currentScope.type(input_scope);
				}
				else if (result.animId === 'N') {
					currentScope.name(input_scope);
				}
				else if (result.name === 'A') {
					currentScope.all(input_scope);
				}
				else if (result.all === 'C') {
					currentScope.care(input_scope);
				}
				else {
					console.log('Sorry didn’t get that, come again?');
				}
			});
			currentScope.visit();
			currentScope.view(currentScope);
		}
	}
	type : function(input_scope) {
		var currentScope = input_scope;
		console.log('Enter animal type');
		prompt.get(['->', 'animal_type'], function(err, result) {
			connection.query( function(err, results) {
			  if (err) throw err;
			});
		}
		currentScope.menu();
		currentScope.promptUser();
	}
	care : function(input_scope) {
		var currentScope = input_scope;
		console.log('Enter city name NY/SF');
		prompt.get(['->', 'city_name'], function(err, result) {
			connection.query( function(err, results) {
				if (err) throw err;
			});
		})
		currentScope.visit();
		currentScope.view(currentScope);
	}
	animId : function(input_scope) {
		var currentScope = input_scope;
		console.log('Enter ID of the animal you want to visit.');
		prompt.get(['->', 'animal_id'], function(err, result) {
			connection.query( function(err, results) {
				if (err) throw err;
			});
		})
		currentScope.visit();
		currentScope.view(currentScope);
	}
	name : function(input_scope) {
		var currentScope = input_scope;
		console.log('Enter name of the animal you want to visit.');
		prompt.get(['->', 'animal_name'], function(err, result) {
			connection.query( function(err, results) {
				if (err) throw err;
			});
		})
		currentScope.visit();
		currentScope.view(currentScope);
	}
	all : function(input_scope) {
		var currentScope = input_scope;
		console.log('Enter animal type');
		prompt.get(['->', 'animal_type'], function(err, result) {
			connection.query( function(err, results) {
			  if (err) throw err;
			});
		})
		currentScope.menu();
		currentScope.promptUser();
	}
	update : function(input_scope) {
		var currentScope = input_scope;
		prompt.get(['->', 'id', 'new_name', 'new_age', 'new_type', 'new_caretaker_id'], function(err, result) {
			connection.query( function(err, results) {
			  if (err) throw err;
			});
		})
		currentScope.menu();
		currentScope.promptUser();
	}
	adopt : function(input_scope) {
		var currentScope = input_scope;
		prompt.get(['->', 'animal_id'], function(err, result) {
			connection.query( function(err, results) {
			  if (err) throw err;
			});
		})
		currentScope.visit();
		currentScope.view(currentScope);
	}
	promptUser : function() {
		var self = this;
		prompt.get('input', function(err, result) {
			if (result.visit === 'Q') {
				self.exit();
			}
			else if (result.visit === 'A') {
				self.add(self);
			}
			else if (result.animId === 'V') {
				self.visit();
				self.view(self);
			}
			else if (result.name === 'D') {
				self.adopt(self);
			}
			else {
				console.log('Sorry didn’t get that, come again?')
			}
		}
	}
	exit : function() {
		console.log('Thank you for visiting us, goodbye~!');
		process.exit();
	}
	open : function() {
		this.welcome();
		this.menu();
		this.promptUser();
	}
}

zoo.open();