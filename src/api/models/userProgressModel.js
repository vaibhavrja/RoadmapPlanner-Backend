dbConn = require('../helpers/dbConfig')

var UserProgress = function(publishedRp){
}

UserProgress.getRoadmapProgress = async (rp_ids,user_id) =>{
    let query = ''
    for(let rp_id of rp_ids)
        query += `select count(*) as count from user_progress where rp_id=${rp_id} && user_id=${user_id};`;
    var result = await new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
    finalres = {}
    if(rp_ids.length == 1){
        finalres[rp_ids[0]] = result[0].count 
    }
    else{
        for(let i in rp_ids){
            finalres[rp_ids[i]] = result[i][0].count 
        }
    }
    return finalres
}

UserProgress.getChaptersProgress = async (chapter_ids,user_id) =>{
    let query = ''
    for(let chapter_id of chapter_ids)
        query += `select count(*) as count from user_progress where chapter_id=${chapter_id} && user_id=${user_id};`;
    var result = await new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
    finalres = {}
    if(chapter_ids.length == 1){
        finalres[chapter_ids[0]] = result[0].count 
    }
    else{
        for(let i in chapter_ids){
            finalres[chapter_ids[i]] = result[i][0].count 
        }
    }
    return finalres
}

UserProgress.getTracksProgress = async (track_ids,user_id) =>{
    let query = ''
    for(let track_id of track_ids)
        query += `select count(*) as count from user_progress where track_id=${track_id} && user_id=${user_id};`;
    var result = await new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
    finalres = {}
    if(track_ids.length == 1){
        finalres[track_ids[0]] = result[0].count 
    }
    else{
        for(let i in track_ids){
            finalres[track_ids[i]] = result[i][0].count 
        }
    }
    return finalres
}

UserProgress.markUserAsCompleted = async (rp_id,chapter_id,track_id,user_id) =>{
    let query = `Insert into user_progress values(${rp_id},${chapter_id},${track_id},${user_id})`
    var result = await new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                if(err.code == "ER_DUP_ENTRY"){
                    resolve(true)
                }
                reject(err)
            }
            else{
                resolve(true)
            }
        })
    })
    return result
}

UserProgress.unmarkUserAsCompleted = async (rp_id,chapter_id,track_id,user_id) =>{
    let query = `Delete from user_progress where rp_id=${rp_id} and chapter_id=${chapter_id} and track_id=${track_id} and user_id=${user_id}`
    var result = await new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(true)
            }
        })
    })
    return result
}

module.exports = UserProgress;