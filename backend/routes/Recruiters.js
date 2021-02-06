// const { application } = require("express");
const express = require("express");
const router = express.Router();
// const ls = require("local-storage");

// Load applicant model
const job = require("../models/jobs");
const recruiter = require("../models/recruiters");
const application = require("../models/applications");

//Load Input validation
const validateJobInput = require("../validation/jobs");
const validateUpdateInput = require("../validation/updateProfile");
// const validateLoginInput = require("../validation/login");

// @route POST /recruiters/createJob
// @desc Create Job
// @access Public
router.post("/createJob", function (req, res) {
 
  //Form Validation
  const { errors, isValid } = validateJobInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json( errors );
  } else{
    const newJob = new job({
      title : req.body.title,
      recruiterName : req.body.recruiterName,
      recruiterEmail : req.body.recruiterEmail,
      maxApplications : req.body.maxApplications,
      maxPositions : req.body.maxPositions,
      deadline : req.body.deadline,
      requiredSkills : req.body.requiredSkills,
      jobType : req.body.jobType,
      duration : req.body.duration,
      salary : req.body.salary,
      remPos : req.body.remPos
    });

    newJob.save()
    .then((newJob) =>  res.status(200).send(newJob))
    .catch((err) => {
      res.status(400).send(err);
    });
  }
});

router.post("/viewJobs", function (req,res){
  var email = req.body.mail;
    job.find( {
        "recruiterEmail" : email
    },async function(err,user){
        if(err){
            console.log(err);
        }
        // await console.log(user);
        await res.json(user);
    });
});

router.post("/delete",async function(req,res){
  var title = req.body.title;
  var email = req.body.mail;
  // console.log(title);
  // console.log(email);
  const arr = await application.deleteMany({
    "jobTitle" : title
  })
  const ans = await job.findOneAndDelete({
      "recruiterEmail" : email,
      "title" : title
  });
  res.json({message:"Successfully deleted"});
  
});

router.post("/viewOneJob", function (req,res){
  var email = req.body.mail;
  var title = req.body.title;
  // console.log(email);
  // console.log(title);
    job.findOne({
        "recruiterEmail" : email,
        "title" : title
    },async function(err,user){
        if(err){
            console.log(err);
        }
        // await console.log(user);
        await res.json(user);
    });
});

router.post("/updateJob", async function (req,res){
  var email = req.body.mail;
  var title = req.body.title;
  var maxApplications = req.body.maxApplications;
  var maxPositions = req.body.maxPositions;
  var deadline = req.body.deadline
  const arr = await job.findOneAndUpdate({
    "recruiterEmail" : email,
    "title" : title
  },{
    "deadline" : deadline,
    "maxApplications" : maxApplications,
    "maxPositions" : maxPositions,
    "remPos" : maxPositions
  },{ new: true});
  res.json({message:"Successfully Updated"});
  // res.json(arr);  
});

router.post("/viewRecruiterProfile", function (req,res){
  var email = req.body.mail;
  // console.log(email);
  // console.log(title);
    recruiter.findOne({
        "email" : email,
    },async function(err,user){
        if(err){
            console.log(err);
        }
        // await console.log(user);
        await res.json(user);
    });
});

router.post("/updateRecruiterProfile", async function (req,res){
  
  const { errors, isValid } = validateUpdateInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json( errors );
  }
  else{
  var email = req.body.mail;
  var contactNumber = req.body.contactNumber;
  var bio = req.body.bio
  const arr = await recruiter.findOneAndUpdate({
    "email" : email
  },{
    "contactNumber" : contactNumber,
    "bio" : bio,
  },{ new: true});
  res.json({message:"Successfully Updated"});
  // res.json(arr);
}  
});




module.exports = router;