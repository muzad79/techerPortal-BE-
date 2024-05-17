import { body, param, validationResult } from 'express-validator';
import * as regexValidate from "../config/constants.mjs"

export const validateRegistration = [
  body('email').isEmail().withMessage("email not valid"),
  body('password').isLength({ min: 8 })
  .matches(regexValidate.regexValidation.passwordValidate).withMessage("password should be min of 8 characters"),
];
//validating new password when changing password
export const validatePassword=[
  body('newpassword').isLength({ min: 8 }).matches(regexValidate.regexValidation.passwordValidate).withMessage("password should be min of 8 characters")
]

export const validateId =[
  param('id').isMongoId().withMessage("Invalid Id")

]

export const validateupdateUser =
[
 body("firstName").isAlpha().optional().withMessage("first name should be alphabet"),
 body("lastName").isAlpha().optional().withMessage("first name should be alphabet"),
 body("age").isNumeric().optional().withMessage("age should be numeric"),
 body("email").isEmail().withMessage("email should conatin @")
]

export const validate = (
  req,
  res,
  next
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};
