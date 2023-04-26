dbConn = require('../src/api/helpers/dbConfig')

const addRoadmapTracks = (req) =>{
    data = req.body;
    let query="";
    for(let chapters of data['chapters']){
        for(let tracks of chapters['tracks']){
            query += `Insert into rp_tracks(title,link,chapters_id) values ('${tracks['title']}','${tracks['link']}',${chapters['chapters_id']});`;
        }
    }
    var result = new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Data Added Successfully")
            }
        })
    })
    return result
}


const deleteRoadmapTracks = (req) =>{
    data = req.body;
    let query = `Delete from rp_tracks where tracks_id=${data['tracks_id']} and chapters_id=${data['chapters_id']}`;
    
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
    addRoadmapTracks,
    deleteRoadmapTracks
}