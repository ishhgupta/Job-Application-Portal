const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateApplyInput(data) {
    let errors = {};
  
    // Convert empty fields to an empty string so we can use validator functions
    data.sop = !isEmpty(data.sop) ? data.sop : "";
   
  
    // sop check
    if (Validator.isEmpty(data.sop)) {
      errors.sop = "Statement of Purpose is required";
    } else if (data.sop.length <= 0 || data.sop.split(" ").length > 250) {
      errors.sop = "Please write in the given limits";
    }
    return {
      errors,
      isValid: isEmpty(errors),
    };
  };
  