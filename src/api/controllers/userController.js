const UsersModel = require('../models/userModel')
const jwt = require("jsonwebtoken")

const getUser = async (req) =>{
    data = req.body;
    result = await UsersModel.findUser(data['email'],data['token']);
    if(result.length == 1){
        return true
    }
    return false
}

const addUser = (req) =>{
    let email = req.body['email']
    let password = req.body['password']
    let query = `Insert into user(email,password) values('${email}','${password}')`
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
                    resolve("True")
                }
                resolve("Some error occured")
            }
        })
    })
    return result
}

module.exports = {
    getUser,
    addUser
}