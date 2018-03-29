var express = require('express')
var mysql = require('mysql')

var app = express()
var con = mysql.createConnection({
	host: "",
	user: "",
	password: "",
	database: ""
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

app.get('/get_users/', function(req, res) {
	var username = req.param('username')
	var password = req.param('password')
	con.query("SELECT (count(username)) FROM users WHERE username like '"
		+ username + "' AND password LIKE '" + password + "'", function (err, result, fields) {
		//console.log(result);
		if (err) {
			res.json({"error": err})
		}
		if (result) {
			res.json({"get_users": result})

		}else{
			res.json({"get_users": "default"})
		}
	});	
})

app.get('/get_users', function(req, res) {
	con.query("SELECT * FROM users", function (err, result, fields) {
		//console.log(result);
		if (err) {
			res.json({"error": err})
		}
		if (result) {
			res.json({"get_users": result})

		}else{
			res.json({"get_users": "default"})
		}
	});	
})

app.get('/get_menu', function(req, res) {
	con.query("SELECT * FROM menu", function (err, result, fields) {
		if (err) {
			res.json({"error": err})
		}
		if (result) {
			res.json({"get_menu": result})
		} else {
			res.json({"get_menu": "default"})
		}
	});
})

app.get('/get_menu/:id', function(req, res) {
	//console.log("id: " + req.params.id)
	con.query("SELECT  FROM menu WHERE section like '" + req.params.id + "'", function (err, result, fields) {
		if (err) {
			res.json({"error": err})
		}
		if (result) {
			res.json({"get_menu": result})
		} else {
			res.json({"get_menu": "default"})
		}
	});
})

app.get('/get_reservations/:id', function(req, res) {
	con.query("select * from reservation where lastName like '" + req.params.id + "'", function (err, result, fields) {
		if (err) {
			res.json({"error": err})
		}
		if (result) {
			res.json({"get_reservations": result})
		} else {
			res.json({"get_reservations": "default"})
		}
	})
})

app.get('/get_reservations', function(req, res) {
	con.query("SELECT * FROM reservation", function (err, result, fields) {
		if (err) {
			res.json({"error": err})
		}
		if (result) {
			res.json({"get_reservations": result})
		} else {
			res.json({"get_reservations": "default"})
		}
	});
})

app.get('/set_reservation', function(req, res) {
	var lastName = req.param('lastName');
	var firstName = req.param('firstName');
	var phone = req.param('phone');
	var time = req.param('time');
	con.query("insert into reservation (firstName, lastName, phone, time) values ('" + firstName + "', '" + lastName + "', '" + phone + "', '" + time + "')", function (err, result, fields) {
		if (err) {
			res.json({"error": err})
		}
		if (result) {
			res.json({"set_reservation": result})
		} else {
			res.json({"set_reservation": "default"})
		}
	})
})

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});
