const roadmapComments = require('../controllers/rpCommentController.js')
const express = require('express')
const router = express.Router()

router.get("/getRoadmapComments",async (req,resp)=>{
    await roadmapComments.getRpComments(req, resp)
})

router.get("/deleteComments",async (req,resp)=>{
    await roadmapComments.deleteComments(req, resp)
})

router.get("/getCommentDetails",async (req,resp)=>{
    await roadmapComments.getCommentDetails(req, resp)
})

router.post("/addComment",async (req,resp)=>{
    await roadmapComments.addComments(req,resp)
})

router.post("/updateComment",async (req,resp)=>{
    await roadmapComments.updateComment(req, resp)
})

module.exports = router;