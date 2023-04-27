require("dotenv/config");
const UsersModel = require('../models/userModel')
const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET_KEY

const createUser = async (data,resp) =>{
    let name = data['name']
    let email = data['email']
    let password = data['password']
    const userDetails = {
        email:email
    }
    jwtToken = jwt.sign(userDetails,secretKey)
    result = await UsersModel.createUser(name,email,password,jwtToken)
    if(result == true){
        resp.cookie('rpUserEmail',email,{ signed: true })
        resp.cookie('rpUserToken',jwtToken,{ signed: true })
        result = true
    }
    return result
}

const authenticateUser = async (data,resp) =>{
    const userDetails = {
        email:data['email']
    }
    jwtToken = jwt.sign(userDetails,secretKey)
    result = await UsersModel.authenticateUser(data['email'],data['password'],jwtToken);
    if(result.changedRows == 1){
        resp.cookie('rpUserEmail',data['email'],{ signed: true })
        resp.cookie('rpUserToken',jwtToken,{ signed: true })
        return true
    }
    return false
}

const authenticateUserJWTToken = async(req,needUserDetails = false) =>{
    data = req.signedCookies
    result = await UsersModel.authenticateUserJWTToken(data['rpUserEmail'],data['rpUserToken']);
    if(needUserDetails && result.length == 1){
        return result
    }
    else if(needUserDetails && result.length != 1){
        return {}
    }
    else if(result.length == 1){
        return true
    }
    return false
}

module.exports = {
    createUser,
    authenticateUser,
    authenticateUserJWTToken
}