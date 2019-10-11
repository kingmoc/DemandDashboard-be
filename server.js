const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require('mongoose')
require('dotenv').config()

// middleware
const tokencheck = require('./middleware/auth-middleware')

// routes
const authRouter = require('./auth/router')
const jobsRouter = require('./jobs/router')
const userRouter = require('./users/router')



const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// Mongo Db Config
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("mongo works"))
    .catch(err => console.log(err))


server.use("/auth", authRouter)
server.use("/jobs", tokencheck, jobsRouter)
server.use("/user", tokencheck, userRouter)

server.get("/", (req, res) => {
    res.send("Welcome to Our Server (DemandDash)");
  });

module.exports = server;