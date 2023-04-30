const UserProgressModel = require('../models/userProgressModel')
const UsersController = require('../controllers/userController')

const getRoadmapProgress = async (req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.query
        result = await UserProgressModel.getRoadmapProgress(data['rp_ids'],userDetails[0].userid)
        return result
    }
    return {}
}

const getChaptersProgress = async (req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.query
        result = await UserProgressModel.getChaptersProgress(data['chapter_ids'],userDetails[0].userid)
        return result
    }
    return {}
}

const getTracksProgress = async (req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.query
        result = await UserProgressModel.getTracksProgress(data['track_ids'],userDetails[0].userid)
        return result
    }
    return {}
}

const markUserAsCompleted = async(req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.body
        result = await UserProgressModel.markUserAsCompleted(data['rp_id'],data['chapter_id'],data['track_id'],userDetails[0].userid)
        return result
    }
    return {}
}

const unmarkUserAsCompleted = async(req) =>{
    userDetails = await UsersController.authenticateUserJWTToken(req,true);
    if(Object.keys(userDetails).length != 0){
        data = req.body
        result = await UserProgressModel.unmarkUserAsCompleted(data['rp_id'],data['chapter_id'],data['track_id'],userDetails[0].userid)
        return result
    }
    return {}
}

module.exports = {
    getRoadmapProgress,
    getChaptersProgress,
    getTracksProgress,
    markUserAsCompleted,
    unmarkUserAsCompleted
}
