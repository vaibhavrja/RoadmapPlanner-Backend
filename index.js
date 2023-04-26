const express = require('express')
const bodyParser = require('body-parser')
const usersRoadmap = require('./BusinessLogic/publishedRoadmap') 
const app = express()
const userRouter = require('./src/api/routes/userRoutes')

//Use to parse the input into json
app.use(bodyParser.json())

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