const RpSubscribersModel = require('../models/rpSubscribersModel')
const UsersController = require('../controllers/userController')

const getSubscribedRpsOfUser = async(req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.body
        result = await RpSubscribersModel.getSubscribedRpsOfUser(userDetails[0].userid)
        return result
    }
    return false
}

const subscribeUser = async (req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.body
        result = await RpSubscribersModel.subscribeUser(data['rp_id'],userDetails[0].userid)
        return result
    }
    return false
}

const unsubscribeUser = async (req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.body
        result = await RpSubscribersModel.unsubscribeUser(data['rp_id'],userDetails[0].userid)
        return result
    }
    return false
}

const likeRoadmap = async (req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.query
        result = await RpSubscribersModel.likeRoadmap(data['rp_id'],userDetails[0].userid)
        return result
    }
    return false
}

const dislikeRoadmap = async (req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.query
        result = await RpSubscribersModel.dislikeRoadmap(data['rp_id'],userDetails[0].userid)
        return result
    }
    return false
}

const updateRoadmapRating = async(req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.query
        result = await RpSubscribersModel.updateRoadmapRating(data['rp_id'],parseInt(data['rating']),userDetails[0].userid)
        return result
    }
    return false
}

module.exports = {
    getSubscribedRpsOfUser,
    subscribeUser,
    unsubscribeUser,
    likeRoadmap,
    dislikeRoadmap,
    updateRoadmapRating,
}