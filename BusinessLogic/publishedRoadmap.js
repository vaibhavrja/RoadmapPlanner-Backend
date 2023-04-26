dbConn = require('../src/api/helpers/dbConfig')
const chapters = require('./chapters')

const getUsersRoadmap = (req) =>{
    let usedId = (req.query)['userId']
    let query = `select * from published_rp where user_id=${usedId}`
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

const addUsersRoadmap = (req) =>{
    data = req.body;
    let query = `Insert into published_rp(rp_title,rp_description,user_id) values('${data['roadmap_title']}','${data['roadmap_description']}','${data['user_id']}')`;
    
    var result = new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                updatedReq = req
                updatedReq.body.rp_id = res.insertId
                chaptersResult = chapters.addRoadmapChapters(updatedReq)
                chaptersResult.then(res=>{
                    if(res == "Data Added Successfully")
                        resolve("Data Added Successfully")
                    else
                        resolve("Some error Occured")
                })
            }
        })
    })
    return result
}

const updateUsersRoadmap = (req) =>{
    data = req.body;
    let query = "";
    if(req.body['roadmap_title'] != undefined && req.body['roadmap_description'] != undefined )
        query = `Update published_rp set rp_title='${data['roadmap_title']}', rp_description ='${data['roadmap_description']}' where rp_id = ${data['rp_id']} and user_id = ${data['user_id']}`;
    else if(req.body['roadmap_title'] != undefined)
        query = `Update published_rp set rp_title='${data['roadmap_title']}' where rp_id = ${data['rp_id']} and user_id = ${data['user_id']}`;
    else if(req.body['roadmap_description'] != undefined)
        query = `Update published_rp set rp_description ='${data['roadmap_description']}' where rp_id = ${data['rp_id']} and user_id = ${data['user_id']}`;
    
    var result = new Promise(function(resolve,reject){
        if(query == "")
        {
            
        }
        else{
            dbConn.query(query,(err,res)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve("Updated successfully")
                }
            })
        }
    })
    return result
}

const deleteUsersRoadmap = (req) =>{
    data = req.body;
    let query = `Delete from published_rp where rp_id=${data['rp_id']} and user_id=${data['user_id']}`;
    
    var result = new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Data deleted successfully")
            }
        })
    })
    return result
}


module.exports = {
    getUsersRoadmap,
    addUsersRoadmap,
    updateUsersRoadmap,
    deleteUsersRoadmap
}