const mysql = require('mysql');

var connection = mysql.createConnection({

    host:'localhost',
    database:'users_db',
    user:'root',
    password:''
});

connection.connect(function(error){

    if(error)
    {
        throw error;
    }
    else
    {
        console.log('connection established');
    }
});

module.exports = connection;