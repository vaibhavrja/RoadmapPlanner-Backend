var mysql = require('mysql');
require("dotenv/config");

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_PRIMARY,
  multipleStatements: true
});
 
connection.connect((err)=>{
    if(err){
        console.log(err)
    }
}); 

module.exports = connection