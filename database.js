const mysql = require('mysql2')


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "yoga",
    
  });

connection.connect(function(error){
    if(error){
       throw error;
    }
    else{

        console.log('connected');
    }
    
});


module.exports = connection;
