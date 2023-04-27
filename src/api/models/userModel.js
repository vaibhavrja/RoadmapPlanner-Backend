dbConn = require('../helpers/dbConfig')

var Users = function(users){
    this.id = users.id;
    this.name = users.name
    this.email = users.email;
    this.password = users.password;
    this.token - users.token;
}

Users.createUser = (name,email,password,jwtToken) =>{
    let query = `Insert into user(name,email,password,token) values('${name}','${email}','${password}','${jwtToken}')`
    var result = new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                if(err.code == "ER_DUP_ENTRY"){
                    resolve("Email id already Present")
                }
                reject(err)
            }
            else{
                if(res.affectedRows == 1){
                    resolve(true)
                }
                resolve(false)
            }
        })
    })
    return result
}

Users.authenticateUser = (email,password,token) =>{
    let query = `Update user set token = '${token}' where email='${email}' and password='${password}'`
    var result = new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
    return result
}

Users.authenticateUserJWTToken = (email,token) =>{
    let query = `select * from user where email='${email}' and token='${token}'`
    var result = new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
    return result
}

module.exports = Users;