const axios = require("axios");

//model Import
const UserInfo = require('../models/UserMatchingJobs')


module.exports = async (cat, keywords) => {
    console.log("key", keywords)
    console.log("cat", cat)
    
    return await axios
        .get(`https://authenticjobs.com/api/?api_key=${process.env.APIKEY}&method=aj.jobs.search&format=json&category=${[...cat]}&perpage=1&keywords=${[...keywords]}`)
        .then(apiData => {
            // console.log(apiData.data.listings)
            let data = apiData.data.listings.listing
            return data.map(listing => {
                return (newListObject = {
                    title: listing.title,
                    post_date: listing.post_date,
                    type: listing.type.name,
                    apply_url: listing.apply_url,
                    url: listing.url,
                    company_info: listing.company
                })       
            })
        })
        .catch(err=> console.log(err))
}