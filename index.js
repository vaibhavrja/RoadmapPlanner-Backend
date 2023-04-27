const express = require('express')
const bodyParser = require('body-parser')
const usersRoadmap = require('./BusinessLogic/publishedRoadmap') 
const app = express()
const userRouter = require('./src/api/routes/userRoutes')
var cookieParser = require('cookie-parser')

//Use to parse the input into json
app.use(bodyParser.json())

//Use to set and get cookies
app.use(cookieParser('roadmap_planner'))

//Routes related to USER table
app.use("/api/user",userRouter)

//Routes related to PUBLISHED_RP table
app.get("/published_roadmap/getUsersRoadmap",(req,resp)=>{
    result = usersRoadmap.getUsersRoadmap(req)
    result.then(res=>{
        resp.send(res);
    }).catch(err=>{
        console.log(err);
    })
})

app.post("/published_roadmap/addUsersRoadmap",(req,resp)=>{
    result = usersRoadmap.addUsersRoadmap(req)
    result.then(res=>{
        resp.send(res);
    }).catch(err=>{
        console.log(err);
    })
})

app.post("/published_roadmap/updateUsersRoadmap",(req,resp)=>{
    result = usersRoadmap.updateUsersRoadmap(req)
    result.then(res=>{
        resp.send(res);
    }).catch(err=>{
        console.log(err);
    })
})

app.post("/published_roadmap/deleteUsersRoadmap",(req,resp)=>{
    result = usersRoadmap.deleteUsersRoadmap(req)
    result.then(res=>{
        resp.send(res);
    }).catch(err=>{
        console.log(err);
    })
})

app.listen(5000)