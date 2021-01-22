const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

// Create Schema
const jobSchema = new Schema({
	title: {
		type: String,
		required: true
    },
    recruiterName: {
		type: String,
		required: true
	},
	recruiterEmail: {
		type: String,
		required: true
    },
    maxApplications :{
        type: Number,
        required: true
    },
    maxPositions :{
        type: Number,
        required : true
    },
	datePosting:{
		type: Date,
		default: Date.now 
	},
	requiredSkills:{
		type: String,
		required: true
    },
    jobType:{
        type: String,
        required : true
    },
    duration:{
        type: Number,
        required : true
    },  
    salary : {
        type: Number,
        required : true
    }
});

// jobSchema.plugin(mongoose_fuzzy_searching, { fields: ["title"] });
module.exports = job = mongoose.model("jobs", jobSchema);
