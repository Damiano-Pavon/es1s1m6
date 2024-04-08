const validateAuthorBody = (req, res, next) => {
  const errors = [];
  const { firstName, lastName, email, password, dateOfBirth, avatar } =
    req.body;
  if (typeof firstName !== "string") {
    errors.push("firstName must be a sting");
  }
  if (typeof lastName !== "string") {
    errors.push("lastName must be a sting");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("please insert a email value");
  }
  if (typeof password !== "string" || password.length < 8) {
    errors.push("password must be a sting");
  }
  if (typeof dateOfBirth !== "string") {
    errors.push("dateOfBirth must be a sting");
  }
  if (typeof avatar !== "string") {
    errors.push("avatar must be a sting");
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
  } else {
    next();
  }
};

module.exports = validateAuthorBody;
