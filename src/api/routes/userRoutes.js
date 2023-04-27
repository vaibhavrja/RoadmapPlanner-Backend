const users = require('../controllers/userController')
const express = require('express')
const router = express.Router()

router.post("/createUser",async (req,resp)=>{
    resp.send(await users.createUser(req.body,resp));
})

router.post("/authenticateUser",async (req,resp)=>{
    resp.send(await users.authenticateUser(req.body,resp));
})

router.post("/authenticateUserJWTToken",async (req,resp)=>{
    resp.send(await users.authenticateUserJWTToken(req,false));
})

module.exports = router;