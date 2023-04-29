dbConn = require('../helpers/dbConfig')

var PublishedRoadmapPlanner = function(publishedRp){
}

PublishedRoadmapPlanner.getAllPublishedRpsByUser = (userid) =>{
    let query = `select * from published_rp where user_id = ${userid}`;
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

PublishedRoadmapPlanner.createRoadmap = async (data,userid) =>{
    let query = `Insert into published_rp(rp_title,rp_description,user_id) values('${data['roadmap_title']}','${data['roadmap_description']}',${userid})`;
    try{
        var result =await new Promise(function(resolve,reject){
            dbConn.query(query,(err,res)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(res)
                }
            })
        })
        if(result['insertId'] != undefined){
            let query="";
            for(let chapters of data['chapters']){
                query += `Insert into rp_chapters(chapters_title,rp_id) values ('${chapters['title']}','${result['insertId']}');`;
            }
            let chaptersResult = await new Promise(function(resolve,reject){
                dbConn.query(query,(err,res)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(res)
                    }
                })
            })
            if(chaptersResult != undefined){
                query=""
                for(let i=0;i<data['chapters'].length;i++){
                    data.chapters[i].chapters_id = chaptersResult[i].insertId
                }
                for(let chapters of data['chapters']){
                    for(let tracks of chapters['tracks']){
                        query += `Insert into rp_tracks(title,link,chapters_id) values ('${tracks['title']}','${tracks['link']}',${chapters['chapters_id']});`;
                    }
                }
                var tracksResult = await new Promise(function(resolve,reject){
                    dbConn.query(query,(err,res)=>{
                        if(err){
                            reject(err)
                        }
                        else{
                            resolve(true)
                        }
                    })
                })
                return true
            }
        }
        return true
    }
    catch(err){
        return false
    }
}

PublishedRoadmapPlanner.updateRoadmap = async (data,userid) =>{
    let query = ``;
    if(data['roadmap_title'] != undefined)
        query += `Update published_rp set rp_title = '${data['roadmap_title']}' where rp_id =${data['rp_id']} && user_id = ${userid};`
    if(data['roadmap_description'] != undefined)
        query += `Update published_rp set rp_description = '${data['roadmap_description']}' where rp_id =${data['rp_id']} && user_id = ${userid};`
    for(let chapter of data['chapters']){
        if(chapter['chapter_id'] != undefined){
            if(chapter['title'] != undefined)
                query+=`Update rp_chapters set chapters_title = '${chapter['title']}' where rp_id =${data['rp_id']} && chapters_id = ${chapter['chapter_id']};`
            if(chapter['tracks'] != undefined) 
                query += creataTaskQuery(chapter['tracks'],chapter['chapter_id'])
            if(chapter['title'] == undefined && chapter['tracks'] == undefined)
                query+=`Delete from rp_chapters where rp_id =${data['rp_id']} && chapters_id = ${chapter['chapter_id']};`;
        }
        else{
            let insertQuery = `Insert into rp_chapters(chapters_title,rp_id) values ('${chapter['title']}',${data['rp_id']});`;
            let result = await new Promise(function(resolve,reject){
                dbConn.query(insertQuery,(err,res)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(res)
                    }
                })
            })
            let chapter_id = result.insertId
            if(chapter['tracks'] != undefined)
                query += creataTaskQuery(chapter['tracks'],chapter_id)
        }
    }
    let result = await new Promise(function(resolve,reject){
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

PublishedRoadmapPlanner.deleteUserRoadmap = (rpid,userid) =>{
    try{
        let query = `Delete from published_rp where rp_id = ${rpid} && user_id = ${userid}`;
        var result = new Promise(function(resolve,reject){
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
    catch(err){
        return false
    }
}

const creataTaskQuery = (tracks,chapter_id) =>{
    let query = ``;
    for(const val of tracks){
        if(val['track_id'] != undefined){
            if(val['title'] != undefined)
                query+=`Update rp_tracks set title='${val['title']}' where track_id=${val['track_id']} && chapters_id=${chapter_id};`
            else if(val['link'] != undefined)
                query+=`Update rp_tracks set link='${val['link']}' where track_id=${val['track_id']} && chapters_id=${chapter_id};`
            else if(val['title'] == undefined || val['link'] == undefined)
                query+= `Delete from rp_tracks where track_id=${val['track_id']} && chapters_id=${chapter_id};`
        }
        else{
            query+=`Insert into rp_tracks(title,link,chapters_id) values('${val['title']}','${val['link']}',${chapter_id});`
        }
    }
    return query
}

module.exports = PublishedRoadmapPlanner;