const express = require("express");
const router = express.Router();

//model Import
const UserInfo = require('../models/UserMatchingJobs')

// server route = /user

router.get("/", async (req, res) => {
    loggedInId = req.loggedInId
    
    UserInfo.findOne({google_id: loggedInId})
        .then(user => {
            res.status(200).json(user)
        })
})


module.exports = router;