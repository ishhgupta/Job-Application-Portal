const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Education Schema
const educationSchema = new Schema({
	instiName: {
		type: String,
		// required: true
	},
	startYear : {
		type: String,
		// required: true
	},
	endYear : {
		type: String,
		// required : true
	}
});

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
	},
	education : {
		type: [educationSchema]
	},
	skills :{
		type : String,
	},
	rating : {
		type: Number,
		range: [0,5]
	}
});

module.exports = applicant = mongoose.model("applicants", applicantSchema);
