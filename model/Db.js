let mysql = require('mysql')

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'owlseye'
})

connection.connect(function(error){
    if (error){
        console.log(error.sqlMessage)
    }
    else{
        console.log('Connect Database')
    }
})

module.exports = connection;    
