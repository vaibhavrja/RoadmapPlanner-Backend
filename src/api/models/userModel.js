dbConn = require('../helpers/dbConfig')

var Users = function(users){
    this.id = users.id;
    this.name = users.name
    this.email = users.email;
    this.password = users.password;
    this.token - users.token;
}

Users.create = () =>{

}

Users.findUser = (email,token) =>{
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