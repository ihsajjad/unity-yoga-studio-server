const mysql = require('mysql2')
const connection = mysql.createConnection({
    host:'localhost',
    database:'yoga',
    user:'root',
    password:'root'
    
   
   

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