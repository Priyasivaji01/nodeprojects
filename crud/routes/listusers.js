var express = require('express');
var router = express.Router();
var app = express();
var database = require('../database.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var sql_query =   "select * from users order by id desc";
  database.query(sql_query,function(error,data){

    res.render('listing_users',{action:'list',userData:data});

  });
  // res.send('listing users');
});

router.get("/adduser", function(request, response, next){

	response.render("listing_users", {action:'add'});

});

router.post("/create_user", function(request, response, next){

	var first_name = request.body.first_name;

	var last_name = request.body.last_name;

	var email = request.body.email;

	var gender = request.body.gender;

	var location = request.body.location;

	var query = `
	INSERT INTO users 
	(first_name, last_name, email, gender,location) 
	VALUES ("${first_name}", "${last_name}", "${email}", "${gender}", "${location}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{

			// var sql_query =   "select * from users order by id desc";
			// database.query(sql_query,function(error,data){
		  
			//   response.render('listing_users',{action:'list',userData:data});
		  
			// });		
			response.redirect('/listusers');

		}

	});

});

router.get('/updateuser/:id', function(req, res , next) {

	const query = req.query;
  
	const id = req.params.id; 

	var sql_query = 'select * from users where id='+ id;
	console.log(sql_query);
		database.query(sql_query,function(error,data){

			res.render('listing_users',{action:'update',userData:data});
		
		  });
  
  });


  router.post("/save_user/:id", function(request, response, next){

	var first_name = request.body.first_name;

	var last_name = request.body.last_name;

	var email = request.body.email;

	var gender = request.body.gender;

	var location = request.body.location;

	const id = request.params.id;


	var query = `UPDATE users 
	SET first_name = "${first_name}", 
	last_name = "${last_name}", 
	email = "${email}", 
	gender = "${gender}" ,
	location = "${location}" 
	WHERE id = "${id}"`;
	console.log(query);

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{

	
			response.redirect('/listusers');

		}

	});

});


router.get('/deleteuser/:id', function(req, res , next) {

	const query = req.query;// query = {sex:"female"}
  
	const id = req.params.id; //params = {id:"000000"}

	var sql_query = 'delete from users where id='+ id;
	console.log(sql_query);
		database.query(sql_query,function(error,data){

			res.redirect('/listusers');
		
		  });
  
  });


module.exports = router;
