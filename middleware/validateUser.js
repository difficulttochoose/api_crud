const yup = require("yup");

const NAME_SCHEMA = yup
  .string()
  .trim()
  .matches(
    /(?=^[A-Z][a-z]*(?:-[A-Z][a-z]*)?$)[A-z-]{1,64}/,
    "Name must be valid name"
  );

const USER_CREATE_SCHEMA = yup.object({
  firstName: NAME_SCHEMA.required(),
  lastName: NAME_SCHEMA.required(),
  email: yup.string().trim().email().required(),
  age: yup.number().min(0).max(120).required(),
  gender: yup
    .string()
    .matches(/male|female|other/, "gender must be 'male', 'female' or 'other'")
    .required(),
  password: yup
    .string()
    .matches(
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)^\w{8,64}$/,
      "Your password must be at least 8 characters long, be of mixed case and also contain a digit or symbol."
    )
    .required(),
});

const USER_UPDATE_SCHEMA = yup.object({
  firstName: NAME_SCHEMA,
  lastName: NAME_SCHEMA,
  email: yup.string().trim().email("email field must be valid email"),
  age: yup.number().min(0).max(120),
  gender: yup
    .string()
    .matches(/male|female|other/, "gender must be 'male', 'female' or 'other'"),
  password: yup
    .string()
    .matches(
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)^\w{8,64}$/,
      "Your password must be at least 8 characters long, be of mixed case and also contain a digit or symbol."
    ),
});

module.exports.validateUserOnCreate = async (req, res, next) => {
  const { body } = req;
  try {
    req.body = await USER_CREATE_SCHEMA.validate(body);
    next();
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

module.exports.validateUserOnUpdate = async (req, res, next) => {
  const { body } = req;
  try {
    req.body = await USER_UPDATE_SCHEMA.validate(body);
    next();
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};
