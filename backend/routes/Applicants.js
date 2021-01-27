const express = require("express");
const router = express.Router();
// const ls = require("local-storage");

// Load applicant model
const job = require("../models/jobs");
const application = require("../models/applications");
const applicant = require("../models/applicants");
//Load Input validation
const validateApplyInput = require("../validation/apply");

// @route GET /applicants/viewJobs
// @desc View All Jobs
// @access Public
router.get("/viewAllJobs", function (req,res){
  job.find({
    deadline: {"$gte" : Date.now()} })
    .then(users => {
      res.json(users);
    })
    .catch(err => {res.status(400).send(err);});
  })

router.post("/apply",function(req,res){
   
  //Form Validation
  const { errors, isValid } = validateApplyInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json( errors );
  } 
     applicant.findOne({ "email" : req.body.applicantEmail},async function(err,user){
       if(user.allowedApp >= 10){
         return res.status(400).json({warning : "You can not apply to more than 10 jobs"});
       }
        else if(user.isWorking === "true"){
          return res.status(400).json({warning : "You already got an job"});
        }
        //creating new application
        const newApplication = new application({
          recruiterEmail : req.body.recruiterEmail,
          applicantEmail : req.body.applicantEmail,
          jobId : req.body.jobId,
          sop : req.body.sop,
          recruiterName : req.body.recruiterName,
          jobTitle : req.body.jobTitle,
          jobSalary : req.body.jobSalary
        });
    
        newApplication.save()
        .then((newApplication) =>  res.status(200).send(newApplication))
        .catch((err) => {
          res.status(400).send(err);
        });

        //updating allowed Applications for applicant
        var openApp = await user.allowedApp+1;
        const ans = await applicant.findOneAndUpdate({
          "_id" : user._id},{
          "allowedApp" : openApp
          },{
            new : true
          });
          
       });

       // updating number of applications for a particular job
       job.findOne({"_id" : req.body.jobId},async function (err,user) {
        // console.log(user); 
        var numApp = await user.numApplications +1;
        //  console.log(numApp);
         const arr = await job.findOneAndUpdate({
          //  "_id" : req.body.jobId
           "_id" : user._id
         }, {
           "numApplications" : numApp
         },{new : true});
        
       })
       
});

router.post("/query", function (req,res){
    application.find( {
        "applicantEmail" : req.body.applicantEmail,
        "jobId" : req.body.jobId
    },async function(err,user){
        if(err){
            console.log(err);
            res.json(err);
        }
        // console.log("heyya");
        await console.log(user);
        await res.json(user);
    });
});

router.post("/myApplications", function (req,res){
  application.find( {
      "applicantEmail" : req.body.applicantEmail,
  },async function(err,user){
      if(err){
          console.log(err);
          res.json(err);
      }
      // console.log("heyya");
      await console.log(user);
      await res.json(user);
  });
});

router.post("/viewApplicantProfile", function (req,res){
  var email = req.body.mail;
  // console.log(email);
  // console.log(title);
    applicant.findOne({
        "email" : email,
    },async function(err,user){
        if(err){
            console.log(err);
        }
        // await console.log(user);
        await res.json(user);
    });
});

router.post("/updateApplicantProfile", async function (req,res){
  
  const { errors, isValid } = validateUpdateInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json( errors );
  }
  else{
  var email = req.body.mail;
  var skills = req.body.skills;
  // var bio = req.body.bio
  const arr = await applicant.findOneAndUpdate({
    "email" : email
  },{
    "skills" : skills,
    // "bio" : bio,
  },{ new: true});
  res.json({message:"Successfully Updated"});
  // res.json(arr);
}  
});
module.exports = router;