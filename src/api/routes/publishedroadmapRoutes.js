const publishedRoadmap = require('../controllers/publishedRpController')
const express = require('express')
const router = express.Router()

// router.post("/createUser",async (req,resp)=>{
//     resp.send(await users.createUser(req.body,resp));
// })


//Routes related to USER table
router.get("/getUsersRoadmap",async (req,resp)=>{
    resp.send(await publishedRoadmap.getUsersRoadmap(req))
})

router.post("/createRoadmap",async (req,resp)=>{
    resp.send(await publishedRoadmap.createRoadmap(req))
})

router.post("/updateUsersRoadmap",async (req,resp)=>{
    resp.send(await publishedRoadmap.updateRoadmap(req))
})

router.post("/deleteUsersRoadmap",async (req,resp)=>{
    resp.send(await publishedRoadmap.deleteUserRoadmap(req))
})

module.exports = router;