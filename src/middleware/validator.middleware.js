const { body, validationResult } = require("express-validator");

const validateRegister = [
  body("username").notEmpty().withMessage("Username can not be empty").trim(),
  body("password")
    .notEmpty()
    .withMessage("Password can not be empty")
    .isLength({ min: 8, max: 1024 })
    .trim()
    .withMessage("Password must contain at least 8 or more characters"),
];

const validateLogin = [
  body("username").notEmpty().withMessage("Username can not be empty").trim(),
  body("password").notEmpty().withMessage("Password can not be empty").trim(),
];

/**
 * Get the validator results and respond with JSON if there is an error.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function results(req, res, next) {
  const valResults = validationResult(req);

  if (!valResults.isEmpty()) {
    const apiResponse = console.response(200, valResults.array()[0].msg);
    return res.status(apiResponse.status).json(apiResponse);
  }

  return next();
}

module.exports = { validateLogin, validateRegister, results };
