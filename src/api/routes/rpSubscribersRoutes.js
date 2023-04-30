const RpSubscribers = require('../controllers/rpSubscribersController')
const express = require('express')
const router = express.Router()

router.get("/getSubscribedRpsOfUser",async (req,resp)=>{
    resp.send(await RpSubscribers.getSubscribedRpsOfUser(req));
})

router.post("/subscribeUserToRp",async (req,resp)=>{
    resp.send(await RpSubscribers.subscribeUser(req));
})

router.post("/unsubscribeUserToRp",async (req,resp)=>{
    resp.send(await RpSubscribers.unsubscribeUser(req));
})

router.get("/likeRoadmap",async (req,resp)=>{
    resp.send(await RpSubscribers.likeRoadmap(req));
})

router.get("/dislikeRoadmap",async (req,resp)=>{
    resp.send(await RpSubscribers.dislikeRoadmap(req));
})

router.get("/updateRoadmapRating",async (req,resp)=>{
    resp.send(await RpSubscribers.updateRoadmapRating(req));
})

module.exports = router;