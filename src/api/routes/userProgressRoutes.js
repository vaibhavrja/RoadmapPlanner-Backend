const usersProgress = require('../controllers/userProgressController')
const express = require('express')
const router = express.Router()

router.get("/getRoadmapProgressOfUser",async (req,resp)=>{
    resp.send(await usersProgress.getRoadmapProgress(req));
})

router.get("/getChaptersProgressOfUser",async (req,resp)=>{
    resp.send(await usersProgress.getChaptersProgress(req));
})

router.get("/getTracksProgressOfUser",async (req,resp)=>{
    resp.send(await usersProgress.getTracksProgress(req));
})

router.post("/markTrackAsCompleted",async (req,resp)=>{
    resp.send(await usersProgress.markUserAsCompleted(req));
})

router.post("/unmarkTrackAsCompleted",async (req,resp)=>{
    resp.send(await usersProgress.unmarkUserAsCompleted(req));
})

module.exports = router;