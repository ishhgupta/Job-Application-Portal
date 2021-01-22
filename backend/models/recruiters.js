const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const recruiterSchema = new Schema({
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
	contactNumber :{
		type: Number,
	},
	bio:{
		type: String
	}
});

module.exports = recruiter = mongoose.model("recruiters", recruiterSchema);
