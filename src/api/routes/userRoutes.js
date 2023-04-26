const users = require('../controllers/userController')
const express = require('express')
const router = express.Router()

router.post("/isUserValid",async (req,resp)=>{
    resp.send(await users.getUser(req));
})

router.post("/addUser",(req,resp)=>{
    result = users.addUser(req)
    result.then(res=>{
        resp.send(res);
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = router;