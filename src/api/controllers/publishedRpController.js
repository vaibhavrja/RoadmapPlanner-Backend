const PublishedRpModel = require('../models/publishedRpModel')
const UsersController = require('../controllers/userController')

const getUsersRoadmap = async (req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(userDetails != {}){
        result = await PublishedRpModel.getAllPublishedRpsByUser(userDetails[0].userid)
        return result
    }
    return {}
}

const createRoadmap = async(req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(userDetails != {}){
        data = req.body
        result = await PublishedRpModel.createRoadmap(data,userDetails[0].userid)
        return result
    }
    return false
}

const deleteUserRoadmap = async (req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(userDetails != {}){
        result = await PublishedRpModel.getAllPublishedRpsByUser(req.body['rpid'],userDetails[0].userid)
        return result
    }
    return false
}

module.exports = {
    getUsersRoadmap,
    createRoadmap,
    deleteUserRoadmap
}
