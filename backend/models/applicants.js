const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const applicantSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	},
	userType:{
		type: String,
		required: true
	}
});

module.exports = applicant = mongoose.model("applicants", applicantSchema);
