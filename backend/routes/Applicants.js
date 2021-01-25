const express = require("express");
const router = express.Router();
// const ls = require("local-storage");

// Load applicant model
const job = require("../models/jobs");

//Load Input validation
const validateJobInput = require("../validation/jobs");
// const validateLoginInput = require("../validation/login");

// @route GET /applicants/viewJobs
// @desc View All Jobs
// @access Public
router.get("/viewAllJobs", function (req,res){
    job.find(async function(err,jobs){
        if(err){
            console.log(err);
        }
        else{
            await res.json(jobs);
        }
        // await console.log(user);
        // await res.json(user);
    });
});

router.post("/delete",async function(req,res){
  var title = req.body.title;
  var email = req.body.mail;
  // console.log(title);
  // console.log(email);
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
        await console.log(user);
        await res.json(user);
    });
});

router.post("/updateJob", async function (req,res){
  var email = req.body.mail;
  var title = req.body.title;
  var maxApplications = req.body.maxApplications;
  var maxPositions = req.body.maxPositions
  const arr = await job.findOneAndUpdate({
    "recruiterEmail" : email,
    "title" : title
  },{
    "maxApplications" : maxApplications,
    "maxPositions" : maxPositions,
    "remPos" : maxPositions
  },{ new: true});
  res.json({message:"Successfully Updated"});
  // res.json(arr);  
});


module.exports = router;