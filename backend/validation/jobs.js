const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateJobInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.maxApplications = !isEmpty(data.maxApplications) ? data.maxApplications : "";
  data.maxPositions = !isEmpty(data.maxPositions) ? data.maxPositions : "";
  data.requiredSkills = !isEmpty(data.requiredSkills) ? data.requiredSkills : "";
  data.jobType = !isEmpty(data.jobType) ? data.jobType : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";
  data.salary = !isEmpty(data.salary) ? data.salary : "";

  // maxApplications checks
  if (Validator.isEmpty(data.maxApplications)) {
    errors.maxApplications = "maxApplications field is required";
  } else if (!Validator.isInt(data.maxApplications)) {
    errors.maxApplications = "Please enter valid number of maximum applications";
  }

  // maxPositions checks
  if (Validator.isEmpty(data.maxPositions)) {
    errors.maxPositions = "Maximum Positions field is required";
  } else if (!Validator.isInt(data.maxPositions)) {
    errors.maxPositions = "Please enter valid number of maximum positions";
  }
//    else if(data.maxPositions > data.maxApplications){
//     errors.maxPositions = "Maximum Positions can not be greater than maximum applications";
//   }

  // title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }

  // requiredSkills checks
  if (Validator.isEmpty(data.requiredSkills)) {
    errors.requiredSkills = "Please enter Required Skill Set or List of languages";
  }

  // type of job checks
  if (Validator.isEmpty(data.jobType)) {
    errors.jobType = "Please select valid Job Type";
  }

  // duration checks
  if (Validator.isEmpty(data.duration)) {
    errors.duration = "Duration field is required";
  } else if (!Validator.isInt(data.duration)) {
    errors.duration = "Duration is invalid";
  } else if (data.duration <= 0 || data.duration > 6) {
    errors.duration = "Duration should be non zero integer below 6";
  }

  // salary checks
  if (Validator.isEmpty(data.salary)) {
    errors.salary = "Salary field is required";
  } else if (!Validator.isInt(data.salary)) {
    errors.salary = "Salary is invalid";
  } else if (data.salary <= 0) {
    errors.salary = "Salary should be non zero integer";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
