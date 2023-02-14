const { check, validationResult } = require("express-validator");

//The validateRequest is an array of validation rules defined using the check function from the express-validator library.
// It checks that the fullName field is not empty, the phone field is a valid phone number between 10 and 12 digits and so on.
exports.validateRequest = [
  check("fullName").notEmpty().withMessage("please enter your name"),
  check("phone")
    .notEmpty()
    .withMessage("mobile number is required")
    .isLength({ min: 10, max: 12 })
    .withMessage("mobile number should be of 10 to 12 digits"),
  check("email").isEmail().withMessage("please enter a valid email"),
  check("hash_password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 4 })
    .withMessage("password should be of 4 characters"),
];

// The isRequestValidated function checks the result of the previous validation rules.
// If there are any validation errors, it returns a 400 error response.
// Otherwise, it calls the next function to continue processing the request.
exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
