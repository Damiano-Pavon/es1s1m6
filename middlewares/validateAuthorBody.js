const validateAuthorBody = (req, res, next) => {
  const errors = [];
  const { firstName, lastName, email, password, dateOfBirth, avatar } =
    req.body;

  if (typeof firstName !== "string") {
    errors.push("firstName must be a string");
  }
  if (typeof lastName !== "string") {
    errors.push("lastName must be a string");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please provide a valid email");
  }
  if (typeof password !== "string" || password.length < 8) {
    errors.push("Password must be a string with at least 8 characters");
  }
  if (typeof dateOfBirth !== "string") {
    errors.push("dateOfBirth must be a string");
  }
  // Verifica se l'avatar è presente e se è una stringa
  if (avatar && typeof avatar !== "string") {
    errors.push("avatar must be a string");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  } else {
    next();
  }
};

module.exports = validateAuthorBody;
