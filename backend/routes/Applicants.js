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
        const newApplication = new application({
          recruiterEmail : req.body.recruiterEmail,
          applicantEmail : req.body.applicantEmail,
          jobId : req.body.jobId,
          sop : req.body.sop
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
          console.log(openApp);
          console.log(ans);
       });

       // updating number of applications for a particular job
       job.findOne({"_id" : req.body.jobId},async function (err,users) {
         var numApplications = await numApplications +1;
         const arr = job.findOneAndUpdate({
           "_id" : req.body.jobId
         }, {
           "numApplications" : numApplications
         },{new : true});
       })



});
module.exports = router;