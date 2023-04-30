const connection = require('../helpers/dbConfig');

const RpComments = {
    create: async (comment) => {
        query = 'INSERT INTO rp_comments (rp_id, user_id, parent, comment) VALUES (?, ?, ?, ?)'
        var result =await new Promise(function(resolve,reject){
            connection.query(query, [comment.rp_id, comment.user_id, comment.parent, comment.comment], (err,res)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(res)
                }
            })
        })
        return result
    },
    findById: async (id) => {
        query = 'SELECT * FROM rp_comments WHERE comment_id = ?'
        var result =await new Promise(function(resolve,reject){
            connection.query(query, id, (err,res)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(res)
                }
            })
        })
        return result
    },
    findAll: async (rp_id, page, limit) => {
        const offset = (page - 1) * limit;
        query = 'SELECT * FROM rp_comments WHERE rp_id = ? LIMIT ?, ? '
        var result =await new Promise(function(resolve,reject){
            connection.query(query, [rp_id, offset, limit], (err,res)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(res)
                }
            })
        })
        return result
    },
    update: async (id, comment) => {
        query = 'UPDATE rp_comments SET comment = ? WHERE comment_id = ?'
        var result = await new Promise(function(resolve,reject){
            connection.query(query, [comment, id], (err,res)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(res)
                }
            })
        })
        return result
    },
    delete: async (id) => {
        query = 'DELETE FROM rp_comments WHERE comment_id = ?'
        var result = await new Promise(function(resolve,reject){
            connection.query(query, id, (err,res)=>{
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
};
module.exports = RpComments;



// INSERT INTO rp_comments (comment_id, rp_id, user_id, parent, comment, timestamp) VALUES
// (1, 71, 1, NULL, 'This is the first comment on roadmap 71', '2023-04-29 10:00:00'),
// (2, 71, 2, NULL, 'This is the second comment on roadmap 71', '2023-04-29 11:00:00'),
// (3, 72, 3, NULL, 'This is the first comment on roadmap 72', '2023-04-29 12:00:00'),
// (4, 71, 4, 1, 'This is a reply to comment 1 on roadmap 71', '2023-04-29 13:00:00'),
// (5, 72, 5, NULL, 'This is the second comment on roadmap 72', '2023-04-29 14:00:00');


