const RpComments = require('../models/rpCommentsModel')

async function getRpComments(req, resp) {
    paga = req.query.paga? parseInt(req.query.paga) : 1
    limit = req.query.limit? parseInt(req.query.limit) :5
    if(!req.query.rp_id){
        return resp.status(400).json({ error: 'Invalid paramter' });
    }
    return  resp.send(await RpComments.findAll(rp_id,paga,limit))
}

async function deleteComments(req, resp) {
    for (const id of req.query.comments_id) {
        RpComments.delete(id)
    }
    return  resp.send({status:true})
}

async function getCommentDetails(req, resp) {
    const comment_id = parseInt(req.query.comment_id);
    if (!comment_id) {
        return resp.status(400).json({ error: 'Comment ID is required' });
    }
    const comment = await RpComments.findById(comment_id);
    if (!comment) {
        return resp.status(404).json({ error: 'Comment not found' });
    }
    return resp.send(await comment);
}

async function addComments(req, resp) {
    const data = req.body
    if(!data.rp_id || !data.user_id || !data.comment){
        return resp.status(400).json({ error: 'Invalid paramter' });
    }
    if(!data.parent){
        data.parent = null
    }
    return resp.send(await RpComments.create(req.body))
}

async function updateComment(req, resp) {
    const comment_id = parseInt(req.body.comment_id);
    const comment = req.body.comment;
    if (!comment_id || !comment) {
        return resp.status(400).json({ error: 'Invalid paramter' });
    }
    return resp.send(await RpComments.update(comment_id, comment))
}

module.exports = {
    getRpComments,
    deleteComments,
    getCommentDetails,
    addComments,
    updateComment
}