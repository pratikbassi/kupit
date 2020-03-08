module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res
      .status(401)
      .send({ error: "You are not allowed to visit this route!" });
  }
  next();
};
