const express = require("express");
const router = express.Router();
require("dotenv").config();

// import api call
const apiSearch = require('./helper')

// Model IMport
const UserInfo = require('../models/UserMatchingJobs')

// server route = /jobs

router.get('/', async (req, res) => {
    loggedInId = req.loggedInId
    keywords = req.body.keys.split(' ')
    categories = req.body.category.split(' ')    

    try {
        const matchingJobs = await apiSearch(categories, keywords)

        const record = await UserInfo.findOne({google_id: loggedInId})
        record.jobs = matchingJobs
        record.save()
            .then(() => {
                UserInfo.findOne({google_id: loggedInId})
                    .then(updated => {
                        res.status(200).json({updated})
                    })
            })
    }
    catch (err) {
        res.status(500).json({ message: "Failed" });
    }



    // res.status(200).json({matchingJobs})

})






module.exports = router;