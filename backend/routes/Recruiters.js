const express = require("express");
const router = express.Router();
// const ls = require("local-storage");

// Load applicant model
const job = require("../models/jobs");

//Load Input validation
const validateJobInput = require("../validation/jobs");
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
      requiredSkills : req.body.requiredSkills,
      jobType : req.body.jobType,
      duration : req.body.duration,
      salary : req.body.salary
    });

    newJob.save()
    .then((newJob) =>  res.status(200).send(newJob))
    .catch((err) => {
      res.status(400).send(err);
    });
  }
});

module.exports = router;