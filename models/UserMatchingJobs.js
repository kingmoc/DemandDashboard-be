const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    name: String,
    url: String, 
    logo: String
})

const JobListingSchema = new Schema({
    title: String,
    post_date: Date,
    type: String,
    apply_url: String,
    url: String,
    company_info: [CompanySchema] 
})

const UserSchema = new Schema({
    google_id: String,
    displayName: String,
    picture: String,
    jobs: [JobListingSchema]
})

const UserInfo = mongoose.model('user', UserSchema)
module.exports = UserInfo