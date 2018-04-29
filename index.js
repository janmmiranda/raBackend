var express = require('express')
var mysql = require('mysql')
var  bodyParser = require('body-parser')

var app = express()
var con = mysql.createConnection({
	 host: "restauto.c8kfv5fb1sng.us-east-2.rds.amazonaws.com",
    user: "restauto",
    password: "restauto1",
    database: "restauto" 

});
app.use(bodyParser.json());

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

app.get('/get_order', function(req, res) {
	con.query("SELECT * FROM orderedItem", function (err, result, fields) {
		if (err) {
			res.json({"error": err})
		}
		if (result) {
			res.json({"get_order": result})
		} else {
			res.json({"get_order": "default"})
		}
	});
})

app.get('/get_order/:id', function(req, res) {
	//console.log("id: " + req.params.id)
	con.query("Select * from orderedItem where table like " + req.params.id + "", function (err, result, fields) {
		if (err) {
			res.json({"error": err})
		}
		if (result) {
			res.json({"get_order": result})
		} else {
			res.json({"get_order": "default"})
		}
	});
})

app.post('/post_users', function(req, res) {
	
    var waiterID = req.body.waiterID;
    var itemName = req.body.itemName;
    var quantity = req.body.quantity;
	var floorID  = req.body.floorID
	var tableID  = req.body.tableID
	var isFirstItem  = req.body.isFirstItem
	var isCompleted  = req.body.isCompleted
	var priceTimesQty= req.body.priceTimesQty
    con.query("INSERT INTO orderedItem (waiterID, itemName, quantity, floorID, tableID, isFirstItem, isCompleted,priceTimesQty) values ('" + waiterID + "', '" + itemName + "', '" + quantity + "','"+ floorID + "', '" + tableID + "', '" + isFirstItem + "', '"+ isCompleted +"', '"+priceTimesQty+"' )", function (err, result, fields) {
        if (err) {
            res.json({"error": err})
        }
        if (result) {
            res.json({"post_users": result})
        } else {
            res.json({"post_users": "default"})
        }
    })
    //res.send(user_id + ' ' + token + ' ' + geo);
});

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

app.listen(8080, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 8080);
});
