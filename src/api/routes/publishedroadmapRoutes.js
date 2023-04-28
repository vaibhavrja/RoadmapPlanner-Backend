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

// router.post("/published_roadmap/updateUsersRoadmap",(req,resp)=>{
//     result = usersRoadmap.updateUsersRoadmap(req)
//     result.then(res=>{
//         resp.send(res);
//     }).catch(err=>{
//         console.log(err);
//     })
// })

router.post("/deleteUsersRoadmap",async (req,resp)=>{
    resp.send(await publishedRoadmap.deleteUserRoadmap(req))
})

module.exports = router;