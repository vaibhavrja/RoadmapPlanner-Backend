const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')
const userRouter = require('./src/api/routes/userRoutes')
const publishedRoadmapPlanner = require('./src/api/routes/publishedroadmapRoutes')
const userProgressRoute = require('./src/api/routes/userProgressRoutes')

//Use to parse the input into json
app.use(bodyParser.json())

//Use to set and get cookies
app.use(cookieParser('roadmap_planner'))

//Routes
app.use("/api/user",userRouter)
app.use("/api/published_roadmap",publishedRoadmapPlanner)
app.use('/api/user_progress',userProgressRoute)

app.listen(5000)