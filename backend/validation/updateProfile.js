const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdateInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
 
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";
  
  // bio check
  if (Validator.isEmpty(data.bio)) {
    errors.bio = "Bio is required";
  } else if (data.bio.length <= 0 || data.bio.split(" ").length > 250) {
    errors.bio = "Please write in the given limits";
  }

  // contactNumber checks
  if (Validator.isEmpty(data.contactNumber)) {
    errors.contactNumber = "Contact Number field is required";
  } else if ((data.contactNumber.toString().length)!==10) {
    errors.contactNumber = "Contact Number is invalid. Please enter 10 digit contact number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
