const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')
const userRouter = require('./src/api/routes/userRoutes')
const publishedRoadmapPlanner = require('./src/api/routes/publishedroadmapRoutes')

//Use to parse the input into json
app.use(bodyParser.json())

//Use to set and get cookies
app.use(cookieParser('roadmap_planner'))

app.use("/api/user",userRouter)

//Routes related to PUBLISHED_RP table
app.use("/api/published_roadmap",publishedRoadmapPlanner)

app.listen(5000)