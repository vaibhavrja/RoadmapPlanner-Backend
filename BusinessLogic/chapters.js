dbConn = require('../src/api/helpers/dbConfig')
tracksFunc = require('./tracks')

const addRoadmapChapters = (req) =>{
    data = req.body;
    let query="";
    for(let chapters of data['chapters']){
        query += `Insert into rp_chapters(chapters_title,rp_id) values ('${chapters['title']}','${data['rp_id']}');`;
    }
    var result = new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                let updatedReq = req
                for(let i=0;i<data['chapters'].length;i++){
                    updatedReq.body.chapters[i].chapters_id = res[i].insertId
                }
                tracksResult = tracksFunc.addRoadmapTracks(updatedReq)
                tracksResult.then(res=>{
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

const updateRoadmapChapters = (req) =>{
    data = req.body;
    let query="";
    for(let chapters of data['chapters']){
        query += `Insert into rp_chapters(chapters_title,rp_id) values ('${chapters['title']}','${data['rp_id']}');`;
    }
    var result = new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                let updatedReq = req
                for(let i=0;i<data['chapters'].length;i++){
                    updatedReq.body.chapters[i].chapters_id = res[i].insertId
                }
                tracksResult = tracksFunc.addRoadmapTracks(updatedReq)
                tracksResult.then(res=>{
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

const deleteRoadmapChapters = (req) =>{
    data = req.body;
    let query = `Delete from rp_chapters where chapters_id=${data['chapters_id']} and rp_id=${data['rp_id']}`;
    
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
    addRoadmapChapters,
    deleteRoadmapChapters
}