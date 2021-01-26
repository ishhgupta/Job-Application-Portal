const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const applicationSchema = new Schema({
    recruiterEmail : {
        type : String,
        required : true
    },
    // recruiterId : {
    //     type : ObjectId,
    //     required : true
    // },
    // recruiterName : {
    //     type : String,
    //     required : true
    // },
    // jobTitle : {
    //     type: String,
    //     required : true
    // },
    // salary : {
    //     type : Number,
    //     required : true
    // },
    applicantEmail : {
        type : String,
        required : true
    },
    // applicantId : {
    //     type : ObjectId,
    //     required : true
    // },
    jobId : {
        type : ObjectId,
        required : true
    },
    sop : {
        type : String,
        required : true
    },
    stage : {
        type : String,
        default : "applied"
    },
    joinDate : {
        type : Date,
    },
    applyDate : {
        type : Date,
        default : Date.now()
    }
});

module.exports = application = mongoose.model("applications", applicationSchema);