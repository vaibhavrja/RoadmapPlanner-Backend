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

PublishedRoadmapPlanner.getAllPublishedRpsByUser = (rpid,userid) =>{
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

module.exports = PublishedRoadmapPlanner;