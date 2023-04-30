dbConn = require('../helpers/dbConfig')

var RpSubscribers = function(users){
    this.id = users.id;
    this.name = users.name
    this.email = users.email;
    this.password = users.password;
    this.token - users.token;
}

RpSubscribers.getSubscribedRpsOfUser = async(user_id) =>{
    let query = `Select t2.rp_id,t2.rp_title,t2.rp_description,t2.total_subscribed,t2.total_likes,t2.total_subscribed,t2.total_dislikes,t1.rating,t1.liked from rp_subscribers t1 INNER JOIN roadmap t2 where t1.rp_id=t2.rp_id and t1.user_id =${user_id}`
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
    return result
}

RpSubscribers.subscribeUser =async (rp_id,user_id) =>{
    let query = `Insert into rp_subscribers(rp_id,user_id) values(${rp_id},${user_id})`
    let count = 0
    var result = await new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                if(err.code == "ER_DUP_ENTRY"){
                    resolve(false)
                }
                reject(err)
            }
            else{
                if(res.affectedRows == 1){
                    count = 1
                    resolve(true)
                }
                resolve(false)
            }
        })
    })
    if(count == 1){
        query = `Update roadmap set total_subscribed = total_subscribed+1 where rp_id=${rp_id}`
        result = new Promise(function(resolve,reject){
            dbConn.query(query,(err,res)=>{
                if(err){
                    reject(err)
                }
                else{
                    if(res.affectedRows == 1){
                        resolve(true)
                    }
                    resolve(false)
                }
            })
        })  
    }
    return result
}

RpSubscribers.unsubscribeUser = (rp_id,user_id) =>{
    let query = `Delete from rp_subscribers where rp_id = ${rp_id} and user_id = ${user_id}`
    let count = 0
    var result = new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                console.log(err)
                reject(err)
            }
            else{
                if(res.affectedRows == 1){
                    count=1
                }
                resolve(true)
            }
        })
    })
    if(count == 1){
        query = `Update roadmap set total_subscribed = total_subscribed-1 where rp_id=${rp_id}`
        result = new Promise(function(resolve,reject){
            dbConn.query(query,(err,res)=>{
                if(err){
                    reject(err)
                }
                else{
                    if(res.affectedRows == 1){
                        resolve(true)
                    }
                    resolve(false)
                }
            })
        })  
    }
    return result
}

RpSubscribers.likeRoadmap = async(rp_id,user_id) =>{
    let query = `Select liked from rp_subscribers where rp_id=${rp_id} and user_id=${user_id}`
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
    query='';
    if(result[0]['liked'] == 0){
        query=`Update rp_subscribers set liked = 1 where rp_id=${rp_id} and user_id=${user_id};`
        query+=`Update roadmap set total_likes = total_likes+1 where rp_id=${rp_id};`
    }
    else if(result[0]['liked'] == 1){
        query=`Update rp_subscribers set liked = 0 where rp_id=${rp_id} and user_id=${user_id};`
        query+=`Update roadmap set total_likes = total_likes-1 where rp_id=${rp_id};`
    }
    else if(result[0]['liked'] == 2){
        query=`Update rp_subscribers set liked = 1 where rp_id=${rp_id} and user_id=${user_id};`
        query+=`Update roadmap set total_likes = total_likes+1 where rp_id=${rp_id};`
        query+=`Update roadmap set total_dislikes = total_dislikes-1 where rp_id=${rp_id};`
    }
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

RpSubscribers.dislikeRoadmap = async(rp_id,user_id) =>{
    let query = `Select liked from rp_subscribers where rp_id=${rp_id} and user_id=${user_id}`
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
    query='';
    if(result[0]['liked'] == 0){
        query=`Update rp_subscribers set liked = 2 where rp_id=${rp_id} and user_id=${user_id};`
        query+=`Update roadmap set total_dislikes = total_dislikes+1 where rp_id=${rp_id};`
    }
    else if(result[0]['liked'] == 1){
        query=`Update rp_subscribers set liked = 2 where rp_id=${rp_id} and user_id=${user_id};`
        query+=`Update roadmap set total_likes = total_likes-1 where rp_id=${rp_id};`
        query+=`Update roadmap set total_dislikes = total_dislikes+1 where rp_id=${rp_id};`
    }
    else if(result[0]['liked'] == 2){
        query=`Update rp_subscribers set liked = 0 where rp_id=${rp_id} and user_id=${user_id};`
        query+=`Update roadmap set total_dislikes = total_dislikes-1 where rp_id=${rp_id};`
    }
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

RpSubscribers.updateRoadmapRating = async(rp_id,rating,user_id)=>{
    let query = `Select rating from rp_subscribers where rp_id=${rp_id} and user_id=${user_id};`
    query += `Select rp_rating,numberOfRating from roadmap where rp_id=${rp_id}`;
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
    const subscribersData = result[0][0]
    const roadmapData = result[1][0]
    if(subscribersData['rating'] == null){
        const updateRpRating = ((roadmapData['rp_rating']*roadmapData['numberOfRating'])+rating)/(roadmapData['numberOfRating']+1)
        query = `Update rp_subscribers set rating=${rating} where rp_id=${rp_id} and user_id=${user_id};`
        query += `Update roadmap set rp_rating=${updateRpRating},numberOfRating=numberOfRating+1 where rp_id=${rp_id}`;
    }
    else{
        const updateRpRating = ((roadmapData['rp_rating']*roadmapData['numberOfRating'])-subscribersData['rating']+rating)/(roadmapData['numberOfRating'])
        query = `Update rp_subscribers set rating=${rating} where rp_id=${rp_id} and user_id=${user_id};`
        query += `Update roadmap set rp_rating=${updateRpRating} where rp_id=${rp_id}`;
    }
    var result = await new Promise(function(resolve,reject){
        dbConn.query(query,(err,res)=>{
            if(err){
                reject(false)
            }
            else{
                resolve(true)
            }
        })
    })
    return result
}

module.exports = RpSubscribers;